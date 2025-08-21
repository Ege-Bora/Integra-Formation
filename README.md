# Integra Formation BAE Şirket Kuruluş Anketi

A modern, Typeform-style multi-step form built with Next.js 14, TypeScript, and Tailwind CSS for collecting company formation information in Turkish.

## Features

- **17 Dynamic Screens**: Complete multi-step form with conditional logic
- **Typeform-style UX**: Clean, minimal interface with progress tracking
- **Turkish Language**: All labels, options, and messages in Turkish
- **Conditional Logic**: Steps 12 and 16 appear based on previous answers
- **Matrix Questions**: Multi-select checkboxes for services and banks
- **Keyboard Navigation**: Enter to proceed, Shift+Enter for newlines
- **Form Validation**: Zod schema validation with Turkish error messages
- **Honeypot Protection**: Hidden field to prevent bot submissions
- **Embed Support**: `/embed` route for iframe integration
- **Mobile Responsive**: Works seamlessly on all devices

## Tech Stack

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Hook Form** for form management
- **Zod** for schema validation
- **Honeypot** anti-spam protection

## Quick Start

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Run development server:**
   ```bash
   pnpm dev
   ```

3. **Open browser:**
   - Main form: http://localhost:3000
   - Embed version: http://localhost:3000/embed

## Form Structure

### Welcome Screen (Screen 0)
- Welcome message and start button
- Estimated completion time

### Questions (Screens 1-17)
1. **Q1**: Existing company status (Evet/Hayır)
2. **Q2**: Value creation area (Ticaret/Sanayi/Servis)
3. **Q3**: Business activity description (Long text)
4. **Q4**: Annual revenue USD (5M ranges)
5. **Q5**: Annual import USD (5M ranges)
6. **Q6**: Annual export USD (5M ranges)
7. **Q7**: Annual profitability USD (5M ranges)
8. **Q8**: Interested services (Matrix checkboxes)
9. **Q9**: Partnership type (Kurumsal/Bireysel/Diğer)
10. **Q10**: Partnership structure details (Short text)
11. **Q11**: Residence permit request (Evet/Hayır)
12. **Q12**: *Conditional* - Number of people for residence permit
13. **Q13**: Physical office request (Evet/Hayır)
14. **Q14**: Previous UAE company (Evet/Hayır)
15. **Q15**: Previous UAE residence permit (Evet/Hayır)
16. **Q16**: *Conditional* - Office headcount request
17. **Q17**: Current Turkish banks (Multi-select)

## API Integration

### Current Setup
- Form submits to `/api/submit`
- Honeypot protection included
- Console logging for development

### Google Sheets Integration (Future)
Replace the TODO section in `/app/api/submit/route.ts` with your Google Apps Script URL:

```typescript
const googleScriptResponse = await fetch('YOUR_GOOGLE_APPS_SCRIPT_URL', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});
```

## Embed Usage

For iframe integration, use the embed route:

```html
<iframe 
  src="https://yourdomain.com/embed" 
  width="100%" 
  height="600px"
  frameborder="0">
</iframe>
```

## File Structure

```
├── app/
│   ├── api/submit/route.ts     # Form submission handler
│   ├── embed/page.tsx          # Embed version (iframe)
│   ├── globals.css             # Global styles
│   ├── layout.tsx              # Root layout
│   └── page.tsx                # Main form page
├── components/
│   ├── fields/                 # Form field components
│   ├── StepShell.tsx          # Step wrapper component
│   └── WelcomeScreen.tsx      # Welcome screen
├── lib/
│   └── schema.ts              # Zod validation schema
└── README.md
```

## Customization

### Adding New Questions
1. Update the Zod schema in `lib/schema.ts`
2. Add the new step to `getVisibleSteps()` function
3. Add rendering logic in `renderStepContent()`
4. Add title in `getStepTitle()`

### Styling
- Modify `app/globals.css` for global styles
- Update `tailwind.config.js` for theme customization
- Component-specific styles in individual files

## Deployment

1. **Build the project:**
   ```bash
   pnpm build
   ```

2. **Deploy to Vercel/Netlify/etc.**
   - The project is ready for deployment on any Next.js-compatible platform

## Success Message

Upon successful submission, users see:
> **Teşekkürler! Bilgileriniz alındı.**
> 
> Formunuz başarıyla gönderildi. En kısa sürede sizinle iletişime geçeceğiz.

## Development Notes

- All Turkish text preserved exactly as specified
- Conditional logic implemented for Q12 and Q16
- Honeypot field named `website` (hidden)
- Form validation with Turkish error messages
- Progress tracking with step numbers
- Keyboard shortcuts implemented
- Mobile-first responsive design

## License

MIT License - Feel free to customize for your needs.
# Integra-Formation
