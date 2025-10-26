
'use client';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export function SignInDialog() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Sign In</DialogTitle>
        <DialogDescription>
          Sign in to your account to save your watchlist and preferences.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email
          </Label>
          <Input id="email" type="email" placeholder="name@example.com" className="col-span-3" />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" aria-label="Password" className="text-right">
            Password
          </Label>
          <Input id="password" type="password" className="col-span-3" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" className="w-full">Sign In</Button>
      </DialogFooter>
      <div className="text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Button variant="link" className="p-0 h-auto">
          Sign Up
        </Button>
      </div>
    </DialogContent>
  );
}
