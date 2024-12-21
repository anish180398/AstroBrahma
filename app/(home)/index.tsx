import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo'
import { Link } from 'expo-router'
import { Text, View } from 'react-native'

export default function Page() {
  const { user } = useUser()

  return (
    <View>
      <Text>hello</Text>
      <Link href={'/(auth)/sign-in'}>Sign In</Link>
      <SignedIn>
        <Text style={{color:'black'}}>Hello test {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="../(auth)/sign-in">
          <Text style={{color:'white'}}>Sign In</Text>
        </Link>
        <Link href="../(auth)/sign-up">
          <Text style={{color:'white'}}>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  )
}