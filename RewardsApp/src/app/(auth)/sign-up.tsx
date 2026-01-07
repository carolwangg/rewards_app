import EnterPin from '@/screens/auth/EnterPin';
import SignUp from '@/screens/auth/SignUp';
import { addBusiness, addCard, addCustomer, deleteClerkUser } from '@/services/apiCalls';
import { AppContext } from '@/store/AppContext';
import { Clerk, useSignUp } from '@clerk/clerk-expo';
import { router } from 'expo-router';
import { useContext, useState } from 'react';
import { Alert } from 'react-native';
import {ClerkAPIResponseError} from "@clerk/types";
import Loading from '@/components/Loading';

export default function SignUpPage() {
  const { userType, setUserId } = useContext(AppContext)!;
  const { isLoaded, signUp, setActive } = useSignUp()
  const [verifying, setVerifying] = useState(false)
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const performAddCustomer = async (email: string, country: string) => {
    const id = signUp?.createdUserId;
    if (!id) { throw Error("No user id found in sign up"); }
    try{
      console.log("user Id:"+id)
      setUserId(id);
      const result = await addCustomer(id, email, country);
      console.log("addCustomer status:"+result.status);
      if (result.status != 201) {
        Alert.alert("Error creating user", "User could not be created");
        console.error("Error creating customer:", result.json)
        throw new Error(result.json.toString());
      }
    }catch(err){
      Alert.alert("Error creating user", "User could not be created");
      console.error("Error creating customer:", JSON.stringify(err, null, 2))
      throw err;
    }
  }

  const performAddBusiness = async (email: string, name: string, country: string) => {
    const id = signUp?.createdUserId;
    if (!id) { throw Error("No user id found in sign up"); }
    try{
      console.log("user Id:"+id)
      setUserId(id);
      const businessResult = await addBusiness(id, email, name, country);
      const cardResult = await addCard(id, name);
      console.log("businessResult status:"+businessResult.status);
      console.log("cardResult status:"+cardResult.status)
      if (businessResult.status != 201 || cardResult.status != 201) {
        Alert.alert("Error creating business", "User could not be created");
        console.error("Error creating business:", businessResult.json + '\n' + cardResult.json)
        throw new Error(businessResult.json + '\n' + cardResult.json);
      }

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
        try{
          await performAddBusiness(email, name, country);
        }catch(err){
          console.error("Error adding business:"+JSON.stringify(err, null, 2))
          Alert.alert("Error creating user", "Error could not be created");
          router.dismissTo("/welcome");
          await deleteClerkUser(signUpAttempt.createdUserId!);
          return;
        }
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
    console.log("Country:"+country)
    if (!isLoaded && !signUp) return console.error("Clerk and sign up not loaded");
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
        try{
          const result = await performAddCustomer(email, country);
          // console.log("perform add customer result:"+result);
        }catch(err){
          console.error("Error adding customer:"+JSON.stringify(err, null, 2))
          Alert.alert("Error creating user", "Error could not be created");
          router.dismissTo("/welcome");
          await deleteClerkUser(signUpAttempt.createdUserId!);
          return;
        }
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