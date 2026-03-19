/**
 * UI Preview Page
 * 
 * Showcases all design system components and color palette.
 * Useful for development and design review.
 */

'use client'

import { Button } from '@/src/components/ui/button'
import { Input } from '@/src/components/ui/input'
import { Textarea } from '@/src/components/ui/textarea'
import { Label } from '@/src/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/src/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/src/components/ui/dialog'
import { Checkbox } from '@/src/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/src/components/ui/radio-group'
import { BookingForm } from '@/src/components/forms/BookingForm'

export default function UIPreviewPage() {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4 max-w-6xl space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-foreground">
            Design System Preview
          </h1>
          <p className="text-xl text-foreground-secondary">
            Dental Clinic UI Components & Color Palette
          </p>
        </div>

        {/* Color Palette */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Color Palette</h2>
          
          {/* Primary Colors */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">
              Primary (Sky Blue)
            </h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="space-y-1">
                  <div
                    className={`h-16 rounded-lg shadow-md bg-primary-${shade}`}
                  />
                  <p className="text-xs text-center text-foreground-muted">
                    {shade}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">
              Secondary (Teal)
            </h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="space-y-1">
                  <div
                    className={`h-16 rounded-lg shadow-md bg-secondary-${shade}`}
                  />
                  <p className="text-xs text-center text-foreground-muted">
                    {shade}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Neutral Colors */}
          <div className="space-y-3">
            <h3 className="text-xl font-semibold text-foreground">
              Neutral (Gray)
            </h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((shade) => (
                <div key={shade} className="space-y-1">
                  <div
                    className={`h-16 rounded-lg shadow-md bg-neutral-${shade} border border-border`}
                  />
                  <p className="text-xs text-center text-foreground-muted">
                    {shade}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Buttons</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="destructive">Destructive</Button>
                <Button variant="link">Link</Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">Sizes</h3>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">States</h3>
              <div className="flex flex-wrap gap-4">
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Form Elements */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Form Elements</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Input */}
            <div className="space-y-2">
              <Label>Input Field</Label>
              <Input placeholder="Enter text..." />
            </div>

            {/* Input with value */}
            <div className="space-y-2">
              <Label>Input with Value</Label>
              <Input value="Sample text" readOnly />
            </div>

            {/* Disabled Input */}
            <div className="space-y-2">
              <Label>Disabled Input</Label>
              <Input placeholder="Disabled" disabled />
            </div>

            {/* Select */}
            <div className="space-y-2">
              <Label>Select Dropdown</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Textarea */}
          <div className="space-y-2">
            <Label>Textarea</Label>
            <Textarea placeholder="Enter a longer message..." />
          </div>

          {/* Checkbox */}
          <div className="space-y-3">
            <Label>Checkboxes</Label>
            <div className="flex flex-col gap-3">
              <div className="flex items-center space-x-2">
                <Checkbox id="check1" />
                <label
                  htmlFor="check1"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check2" defaultChecked />
                <label
                  htmlFor="check2"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Subscribe to newsletter
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="check3" disabled />
                <label
                  htmlFor="check3"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Disabled checkbox
                </label>
              </div>
            </div>
          </div>

          {/* Radio Group */}
          <div className="space-y-3">
            <Label>Radio Group</Label>
            <RadioGroup defaultValue="option1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option1" id="r1" />
                <Label htmlFor="r1">Option 1</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option2" id="r2" />
                <Label htmlFor="r2">Option 2</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="option3" id="r3" />
                <Label htmlFor="r3">Option 3</Label>
              </div>
            </RadioGroup>
          </div>
        </section>

        {/* Dialog */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Dialog (Modal)</h2>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button>Open Dialog</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Dialog Title</DialogTitle>
                <DialogDescription>
                  This is a description of what the dialog is about. It provides
                  context to the user.
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-sm text-foreground-secondary">
                  Dialog content goes here. You can add forms, information, or
                  any other content.
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Confirm</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        {/* Complete Form Example */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Complete Form Example
          </h2>
          <p className="text-foreground-secondary">
            A fully functional booking form with validation
          </p>
          
          <div className="max-w-2xl bg-background-secondary rounded-2xl shadow-xl p-8 border border-border">
            <BookingForm />
          </div>
        </section>

        {/* Typography */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">Typography</h2>
          
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-foreground">
              Heading 1 - 5xl
            </h1>
            <h2 className="text-4xl font-bold text-foreground">
              Heading 2 - 4xl
            </h2>
            <h3 className="text-3xl font-bold text-foreground">
              Heading 3 - 3xl
            </h3>
            <h4 className="text-2xl font-semibold text-foreground">
              Heading 4 - 2xl
            </h4>
            <h5 className="text-xl font-semibold text-foreground">
              Heading 5 - xl
            </h5>
            <h6 className="text-lg font-semibold text-foreground">
              Heading 6 - lg
            </h6>
            <p className="text-base text-foreground">
              Body text - Regular paragraph with normal weight and size.
            </p>
            <p className="text-sm text-foreground-secondary">
              Small text - Secondary information with muted color.
            </p>
            <p className="text-xs text-foreground-muted">
              Extra small text - Tertiary information with more muted color.
            </p>
          </div>
        </section>

        {/* Spacing & Shadows */}
        <section className="space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            Spacing & Shadows
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-background-secondary rounded-lg p-6 shadow-sm border border-border">
              <p className="text-sm font-medium text-foreground">Shadow SM</p>
            </div>
            <div className="bg-background-secondary rounded-lg p-6 shadow-md border border-border">
              <p className="text-sm font-medium text-foreground">Shadow MD</p>
            </div>
            <div className="bg-background-secondary rounded-lg p-6 shadow-lg border border-border">
              <p className="text-sm font-medium text-foreground">Shadow LG</p>
            </div>
            <div className="bg-background-secondary rounded-lg p-6 shadow-xl border border-border">
              <p className="text-sm font-medium text-foreground">Shadow XL</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
