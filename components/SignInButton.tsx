"use client";
import React from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

type Props = {};

const SignInButton = (props: Props) => {
  return (
    <Button
      variant="ghost"
      onClick={() => {
        signIn("github");
      }}
      className="body-text text-gradient_blue-purple"
    >
      Sign In
    </Button>
  );
};

export default SignInButton;
