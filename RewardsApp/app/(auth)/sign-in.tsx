import { useSignIn } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { EmailCodeFactor, SignInFirstFactor } from '@clerk/types'
import Login from '@/components/Login';
import EnterPin from '@/components/EnterPin';
import { useAuth } from '@clerk/clerk-expo'

export default function SignIn() {
    // const { isLoaded, signIn, setActive } = useSignIn();
    // const [verifying, setVerifying] = useState(false);
    // const [phone, setPhone] = useState('');
    // const [code, setCode] = useState('');
    const { isLoaded, signIn, setActive } = useSignIn()
    const [verifying, setVerifying] = useState(false)
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    console.log("sign in: " + useAuth().isSignedIn);
    
    const onSignInPress = useCallback(async () => {
      if (!isLoaded) return
      // Start the sign-in process using the email and password provided
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

        // Send the OTP code to the user
        await signIn.prepareFirstFactor({
          strategy: 'email_code',
          emailAddressId,
        })

        // Set verifying to true to display second form
        // and capture the OTP code
        setVerifying(true)
      }
    } catch (err: any) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }, [isLoaded, email]);
  
  const handleVerification = useCallback(async () => {
    if (!isLoaded && !signIn) return null
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

            router.navigate('../(tabs)/(home)/landing')
          },
        })
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(signInAttempt)
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }, [code, isLoaded, signIn]);

    console.log(verifying);
    if (code.length == 6) {
      handleVerification();
    }
    if (verifying) {
      console.log("enter pin");
      return <EnterPin setCode={setCode} setVerifying={setVerifying} handleVerification={handleVerification} />;
    }
    return (<Login 
      phoneNumber={email}
      setPhoneNumber={setEmail}
      onLogIn={onSignInPress}
    />);
}