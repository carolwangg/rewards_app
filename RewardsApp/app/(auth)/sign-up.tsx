import { useSignIn, useSignUp } from '@clerk/clerk-expo'
import { router } from 'expo-router'
import { useCallback, useState } from 'react'
import { PhoneCodeFactor, SignInFirstFactor } from '@clerk/types'
import Login from '@/components/Login';
import EnterPin from '@/components/EnterPin';
export default function SignUp() {
    // const { isLoaded, signIn, setActive } = useSignIn();
    // const [verifying, setVerifying] = useState(false);
    // const [phone, setPhone] = useState('');
    // const [code, setCode] = useState('');
    const { isLoaded, signUp, setActive } = useSignUp()
    const [verifying, setVerifying] = useState(false)
    const [phone, setPhone] = useState('')
    const [code, setCode] = useState('')
    console.log("run");
    const onSignUpPress = useCallback(async () => {
      if (!isLoaded && !signUp) return null

    try {
      // Start the sign-up process using the phone number method
      await signUp.create({
        emailAddress: phone,
      })

      // Start the verification - a SMS message will be sent to the
      // number with a one-time code
      await signUp.prepareEmailAddressVerification()

      // Set verifying to true to display second form and capture the OTP code
      setVerifying(true)
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }, [isLoaded, signUp, phone]);
  //   const onSignInPress = useCallback(async () => {
  //     if (!isLoaded && !signIn) return
  //     // Start the sign-in process using the email and password provided
  //     try {
  //       const signInResource = await signIn.create({
  //         identifier: phone,
  //       })

  //     // Filter the returned array to find the 'phone_code' entry
  //     const supportedFirstFactors = signInResource.supportedFirstFactors

  //     const isPhoneCodeFactor = (factor: SignInFirstFactor): factor is PhoneCodeFactor => {
  //       return factor.strategy === 'phone_code'
  //     }
  //     const phoneCodeFactor = supportedFirstFactors?.find(isPhoneCodeFactor)

  //     if (phoneCodeFactor) {
  //       // Grab the phoneNumberId
  //       const { phoneNumberId } = phoneCodeFactor

  //       // Send the OTP code to the user
  //       await signIn.prepareFirstFactor({
  //         strategy: 'phone_code',
  //         phoneNumberId,
  //       })

  //       // Set verifying to true to display second form
  //       // and capture the OTP code
  //       setVerifying(true)
  //     }
  //   } catch (err: any) {
  //     // See https://clerk.com/docs/guides/development/custom-flows/error-handling
  //     // for more info on error handling
  //     console.error('Error:', JSON.stringify(err, null, 2))
  //     if (err.errors[0].code === 'form_identifier_not_found') {
  //       console.log("signing up");
  //       onSignUpPress(phone, setVerifying);
  //     }
  //   }
  // }, [isLoaded, phone]);
  const handleVerification = useCallback(async () => {
    console.log("Code"+code);
    if (!isLoaded && !signUp) return null
    await signUp.reload();
    try {
      // Use the code provided by the user and attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({
          session: signUpAttempt.createdSessionId,
          navigate: async ({ session }) => {
            if (session?.currentTask) {
              // Check for tasks and navigate to custom UI to help users resolve them
              // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
              console.log(session?.currentTask)
              return
            }

            await router.push('../(tabs)/(home)/landing')
          },
        })
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(signUpAttempt)
      }
    } catch (err) {
      // See https://clerk.com/docs/guides/development/custom-flows/error-handling
      // for more info on error handling
      console.error('Error:', JSON.stringify(err, null, 2))
    }
  }, [code, isLoaded, signUp, setActive]);
  // const handleVerification = useCallback(async () => {
  //   if (!isLoaded && !signIn) return null
  //   try {
  //     // Use the code provided by the user and attempt verification
  //     const signInAttempt = await signIn.attemptFirstFactor({
  //       strategy: 'phone_code',
  //       code,
  //     })

  //     // If verification was completed, set the session to active
  //     // and redirect the user
  //     if (signInAttempt.status === 'complete') {
  //       await setActive({
  //         session: signInAttempt.createdSessionId,
  //         navigate: async ({ session }) => {
  //           if (session?.currentTask) {
  //             // Check for tasks and navigate to custom UI to help users resolve them
  //             // See https://clerk.com/docs/guides/development/custom-flows/overview#session-tasks
  //             console.log(session?.currentTask)
  //             return
  //           }

  //           router.navigate('../(tabs)/(home)/landing')
  //         },
  //       })
  //     } else {
  //       // If the status is not complete, check why. User may need to
  //       // complete further steps.
  //       console.error(signInAttempt)
  //     }
  //   } catch (err) {
  //     // See https://clerk.com/docs/guides/development/custom-flows/error-handling
  //     // for more info on error handling
  //     console.error('Error:', JSON.stringify(err, null, 2))
  //   }
  // }, [code, isLoaded, signIn]);

    console.log(verifying);
    if (code.length == 6) {
      handleVerification();
    }
    if (verifying) {
      console.log("enter pin");
      return <EnterPin setCode={setCode} setVerifying={setVerifying} handleVerification={handleVerification} />;
    }
    return (<Login 
      phoneNumber={phone}
      setPhoneNumber={setPhone}
      onLogIn={onSignUpPress}
    />);
}