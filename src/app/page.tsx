import { Button } from '@/components/ui/button'
import { Show, SignInButton, UserButton } from '@clerk/nextjs'


const page = () => {
  return (
    <div>

      <Show when={"signed-out"}>
        <Button>
          <SignInButton />
        </Button>
      </Show>

      <Show when={"signed-in"}>
      
          <UserButton />
    
      </Show>
    </div>
  )
}

export default page
