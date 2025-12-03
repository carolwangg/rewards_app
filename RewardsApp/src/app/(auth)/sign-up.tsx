import EnterPin from '@/screens/auth/EnterPin';
import SignUp from '@/screens/auth/SignUp';
import { addBusiness, addCard, addCustomer } from '@/services/apiCalls';
import { AppContext } from '@/store/AppContext';
import { useSignUp, useUser } from '@clerk/clerk-expo';
import { Redirect, router } from 'expo-router';
import { useCallback, useContext, useState } from 'react';
import { Alert } from 'react-native';
import {ClerkAPIResponseError} from "@clerk/types";
import { SelectCountry } from 'react-native-element-dropdown';
import Loading from '@/components/Loading';
import { useNavigation } from 'expo-router';
export default function SignUpPage() {
  const { userType, setUserId } = useContext(AppContext)!;
  const { isLoaded, signUp, setActive } = useSignUp()
  const [verifying, setVerifying] = useState(false)
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const performAddCustomer = async (email: string, country: string) => {
    console.log("performAddCustomer function")
    if (!(signUp && signUp.createdUserId)) {
      console.log("weirdly not sign up")
      console.log("sign up:"+signUp)
      signUp && console.log("customerid:"+signUp.createdUserId);
      return null
    }
    const id = signUp.createdUserId;
    try{
      console.log("user Id:"+id)
      setUserId(id);
      addCustomer(id, email, country);
    }catch(err){
      Alert.alert("Error creating user", "Error could not be created");
      console.error("Error creating customer:", JSON.stringify(err, null, 2))
    }
  }

  const performAddBusiness = async (email: string, name: string, country: string) => {
    console.log("performAddBusiness function")
    if (!(signUp && signUp.createdUserId)) {
      console.log("weirdly not sign up")
      console.log("sign up:"+signUp)
      signUp && console.log("customerid:"+signUp.createdUserId);
      return null
    }
    const id = signUp.createdUserId;
    console.log("perform business add id function:"+id);
    try{
      console.log("user Id:"+id)
      setUserId(id);
      addBusiness(id, email, name, country);
      addCard(id, name);
    }catch(err){
      Alert.alert("Error creating user", "Could not locate user");
      console.error("Error creating customer:", JSON.stringify(err, null, 2))
    }
  }

  const handleVerificationBusiness = async (email: string, name: string, country: string, code: string) => {
    console.log("Code on verify business:"+code);
    if (!isLoaded && !signUp) return console.error("clerk and sign up not loaded");
    await signUp.reload();
    try {
      // Use the code provided by the user and attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })
      console.log("sent code")
      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        performAddBusiness(email, name, country);
        console.log("sign up complete")
        console.log("rerouting to business:");
        router.dismissTo("/welcome");
        router.replace("/business/landing");
        await setActive({
          session: signUpAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
              console.log(session?.currentTask);
              return
            }
          },
        });
              
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(signUpAttempt);
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
      const clerkErr = err as ClerkAPIResponseError;
      Alert.alert("Error", clerkErr.message);
    }
    setLoading(false);
  }

  const onSignUpPress = async (email: string, name: string, country: string) => {
    console.log("email:"+email);
    setEmail(email);
    setName(name);
    setCountry(country);
    if (!isLoaded && !signUp) return console.error("clerk and sign up not loaded");
    if (email == ""){Alert.alert("Error", "Please enter an email address");}
    setLoading(true);
    try {
      // Start the sign-up process using the email method
      await signUp.create({
        emailAddress: email,
      })
      console.log("set verifying")

      // Start the verification - an email will be sent to the
      // email address with a one-time code
      await signUp.prepareEmailAddressVerification();
      
      // Set verifying to true to display second form and capture the OTP code
      setVerifying(true)
    } catch (err) {
      const clerkErr = err as ClerkAPIResponseError;
      Alert.alert("Error", clerkErr.message);
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
    }
    setLoading(false);
  };

  const handleVerificationCustomer = async (email: string, country: string, code: string) => {
    console.log("Code"+code);
    if (!isLoaded && !signUp) return console.error("clerk and sign up not loaded");
    await signUp.reload();
    try {
      // Use the code provided by the user and attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })
      console.log("sent code")
      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        performAddCustomer(email, country);
        console.log("sign up complete")
        console.log("rerouting to customer:");
        router.dismissTo("/welcome");
        router.replace(`/customer/landing`);
        await setActive({
          session: signUpAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
              console.log(session?.currentTask);
              return
            }
          },
        });
              
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(signUpAttempt);
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
      const clerkErr = err as ClerkAPIResponseError;
      Alert.alert("Error", clerkErr.message);
    }
    setLoading(false);
  }

  if (loading) {
    return <Loading/>
  }
  if (verifying) {
    console.log("enter pin");
    const handleVerification = (code: string) => {
      if (userType == "customer"){
          handleVerificationCustomer(email, country, code);
      }else{
          handleVerificationBusiness(email, name, country, code);
      }      
    }
    return <EnterPin setLoading={setLoading} setVerifying={setVerifying} handleVerification={handleVerification} />;
  }
  return (<SignUp
  userType={userType}
  onSignUp={onSignUpPress}
  />);
    
}