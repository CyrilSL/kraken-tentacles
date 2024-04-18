import { Button, Heading, Text } from "@medusajs/ui"
<<<<<<< HEAD
import Link from "next/link"
=======
import Link from 'next/link'
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)

const SignInPrompt = () => {
  return (
    <div className="bg-white flex items-center justify-between">
      <div>
        <Heading level="h2" className="txt-xlarge">
          Already have an account?
        </Heading>
        <Text className="txt-medium text-ui-fg-subtle mt-2">
          Sign in for a better experience.
        </Text>
      </div>
      <div>
<<<<<<< HEAD
        <Link href="/account/login">
          <Button variant="secondary" className="h-10">
=======
        <Link href="/account">
          <Button variant="secondary" className="h-10" data-testid="sign-in-button">
>>>>>>> 6e932a4 (uses Link now, and build without error ts-ignored's a lot)
            Sign in
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default SignInPrompt
