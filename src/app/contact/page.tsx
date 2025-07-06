"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex p-6 md:p-10 justify-center min-h-screen bg-muted px-4">
      <div className="w-full max-w-2xl bg-background rounded-md shadow-md h-fit p-6 md:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-semibold">Contact Us</h1>
        </div>

        {submitted ? (
          <div className="text-green-600 text-center text-lg font-medium">
            Thank you! We&apos;ll be in touch soon.
          </div>
        ) : (
          <>
            <p className="text-muted-foreground mt-2">
              Fill up the form below to send us a message.
            </p>
            <form
              action="https://api.web3forms.com/submit"
              method="POST"
              onSubmit={() => setSubmitted(true)}
              className="space-y-6"
            >
              <input
                type="hidden"
                name="access_key"
                value="2e1df742-c5dd-4de8-acd1-a54c457c4419"
              />
              <input
                type="hidden"
                name="subject"
                value="New Submission from Web3Forms"
              />
              <input type="checkbox" name="botcheck" className="hidden" />

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium mb-1"
                  >
                    First Name
                  </label>
                  <Input
                    id="first_name"
                    name="name"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium mb-1"
                  >
                    Last Name
                  </label>
                  <Input
                    id="last_name"
                    name="last_name"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-1"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+1 (555) 1234-567"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-1"
                >
                  Your Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Your message..."
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
