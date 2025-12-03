import Loading from '@/components/Loading';
import EnterPin from '@/screens/auth/EnterPin';
import SignIn from '@/screens/auth/SignIn';
import { AppContext } from '@/store/AppContext';
import { useAuth, useSignIn } from '@clerk/clerk-expo';
import { ClerkAPIResponseError, EmailCodeFactor, SignInFirstFactor } from '@clerk/types';
import { Redirect, router } from 'expo-router';
import { useCallback, useContext, useState } from 'react';
import { Alert } from 'react-native';

export default function SignInPage() {
    const {isSignedIn} = useAuth();
    const { isLoaded, signIn, setActive } = useSignIn()
    const { userId } = useAuth();
    const [verifying, setVerifying] = useState(false)
    const {setUserId, userType} = useContext(AppContext)!;
    const [loading, setLoading] = useState(false);
    console.log("sign in: " + useAuth().isSignedIn);
    const setUserIdCallBack = useCallback(async()=>{
      if(!userId) return;
      setUserId(userId);
    }, [userId])
    const onSignInPress = async (email: string) => {
      if (!isLoaded) return console.error("isLoaded is false")
      // Start the sign-in process using the email and password provided
      setLoading(true);
      try {
        const signInResource = await signIn.create({
          identifier: email,
        })

      // Filter the returned array to find the 'phone_code' entry
      const supportedFirstFactors = signInResource.supportedFirstFactors

      const isEmailCodeFactor = (factor: SignInFirstFactor): factor is EmailCodeFactor => {
        return factor.strategy === 'email_code'
      }
      const emailCodeFactor = supportedFirstFactors?.find(isEmailCodeFactor)

      if (emailCodeFactor) {
        // Grab the emailAddressId
        const { emailAddressId } = emailCodeFactor
        
        // Set verifying to true to display second form
        // and capture the OTP code

        

        // Send the OTP code to the user
        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId,
        })
        setVerifying(true);  
        setLoading(false);

      }
    } catch (err: any) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
      const clerkErr = err as ClerkAPIResponseError;
      Alert.alert("Error", clerkErr.message);
    }
    setLoading(false);
    
  };
  
  const handleVerification = async (code: string) => {
    if (!isLoaded && !signIn) return console.error("isLoaded false and signIn false")
    try {
      // Use the code provided by the user and attempt verification
      const signInAttempt = await signIn.attemptFirstFactor({
        strategy: 'email_code',
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({
          session: signInAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
              console.log(session?.currentTask)
              return
            }
            setUserIdCallBack();
            setTimeout(()=>{}, 1000);
            console.log("isSignedIn:"+isSignedIn);
            if (userType === "customer"){
              console.log("navigating to customer");
              router.dismissTo("/");
              router.navigate("/customer/landing")
            }else{
              console.log("navigating to business");
              router.dismissTo("/");
              router.navigate("/business/landing")
            }
          },
        })
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(signInAttempt);
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error 
      console.error('Error:', JSON.stringify(err, null, 2))
      const clerkErr = err as ClerkAPIResponseError;
      Alert.alert("Error", clerkErr.message);
    }
    setLoading(false);
  };
  if (loading) {
    return <Loading/>
  }
  if (verifying){
    return <EnterPin setLoading={setLoading} setVerifying={setVerifying} handleVerification={(code: string) => {handleVerification(code)}} />;
  }
  return (<SignIn 
    onSignIn={(email: string) => {onSignInPress(email)}}
  />);
}