import { Button } from '@/components/ui/button'
import { Show, SignInButton, UserProfile } from '@clerk/nextjs'

import React from 'react'

const page = () => {
  return (
    <div>

      <Show when={"signed-out"}>
        <Button>
          <SignInButton />
        </Button>
      </Show>

      <Show when={"signed-in"}>
  <Button>
    <UserProfile/>
  </Button>
      </Show>
    </div>
  )
}

export default page
