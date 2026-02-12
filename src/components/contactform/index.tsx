import React, { useState, useMemo, useCallback } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import dynamic from "next/dynamic";
import styles from "./contactform.module.css";

// Dynamically import the 3D model viewer to avoid SSR issues
const Model3DViewer = dynamic(() => import("./Model3D"), {
  ssr: false,
  loading: () => (
    <div style={{ 
      width: "100%", 
      height: "100%", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center",
      color: "#888"
    }}>
      Loading 3D Model...
    </div>
  ),
});

type ContactFormInputs = {
  email: string;
  subject: string;
  message: string;
};

interface ContactFormProps {
  isOpen: boolean;
  shouldRender3D: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({ isOpen, shouldRender3D }) => {
  const [playAnimation, setPlayAnimation] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormInputs>({
    mode: "onBlur",
  });

  // Memoize environment variables
  const emailConfig = useMemo(() => ({
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
  }), []);

  // Memoized submit handler
  const onSubmit = useCallback(async (data: ContactFormInputs) => {
    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          email: data.email,
          subject: data.subject,
          message: data.message,
        },
        emailConfig.publicKey,
      );

      console.log("Email sent successfully, triggering animation");
      
      // Trigger the 3D model animation on successful send
      setPlayAnimation(true);
      
      reset();
    } catch (error) {
      console.error("Email send failed", error);
      alert("Something went wrong. Please try again.");
    }
  }, [emailConfig, reset]);

  // Memoized animation complete handler
  const handleAnimationComplete = useCallback(() => {
    console.log("Animation complete callback received");
    // Reset animation state after it completes
    setTimeout(() => {
      setPlayAnimation(false);
      console.log("Animation state reset");
    }, 1000);
  }, []);

  // Memoize form fields configuration
  const formFields = useMemo(() => ({
    email: {
      type: "email" as const,
      placeholder: "john@example.com",
      label: "Email Address *",
      validation: { required: "Email is required" }
    },
    subject: {
      type: "text" as const,
      placeholder: "Job / Freelance / Collaboration",
      label: "Subject *",
      validation: { required: "Subject is required" }
    },
    message: {
      rows: 5,
      placeholder: "Tell me about your idea...",
      label: "Message *",
      validation: { required: "Message is required" }
    }
  }), []);

  return (
    <section className={styles.contactSection}>
      <div className={styles.leftcontaner}>
        {shouldRender3D && (
          <Model3DViewer 
            playAnimation={playAnimation} 
            onAnimationComplete={handleAnimationComplete}
          />
        )}
      </div>
      <div className={styles.rightcontaner}>
        <header className={styles.contactHeader}>
          <h2>Let's Work Together</h2>
          <p>
            Have a project, role, or just want to say hi?
            <br />
            Fill out the form and I'll get back to you.
          </p>
        </header>

        <form
          className={styles.contactForm}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex w-full gap-2">
            <div className={styles.formGroup}>
              <label>{formFields.email.label}</label>
              <input
                type={formFields.email.type}
                placeholder={formFields.email.placeholder}
                {...register("email", formFields.email.validation)}
                aria-invalid={errors.email ? "true" : "false"}
              />
              {errors.email && (
                <span className={styles.error} role="alert">
                  {errors.email.message}
                </span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>{formFields.subject.label}</label>
              <input
                type={formFields.subject.type}
                placeholder={formFields.subject.placeholder}
                {...register("subject", formFields.subject.validation)}
                aria-invalid={errors.subject ? "true" : "false"}
              />
              {errors.subject && (
                <span className={styles.error} role="alert">
                  {errors.subject.message}
                </span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>{formFields.message.label}</label>
            <textarea
              rows={formFields.message.rows}
              placeholder={formFields.message.placeholder}
              {...register("message", formFields.message.validation)}
              aria-invalid={errors.message ? "true" : "false"}
            />
            {errors.message && (
              <span className={styles.error} role="alert">
                {errors.message.message}
              </span>
            )}
          </div>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {isSubmitSuccessful && !isSubmitting && (
            <div className={styles.successMessage} role="status">
              Message sent successfully!
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;