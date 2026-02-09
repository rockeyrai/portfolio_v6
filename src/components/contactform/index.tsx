import React, { useState, Suspense } from "react";
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

const ContactForm: React.FC = () => {
  const [playAnimation, setPlayAnimation] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormInputs>({
    mode: "onBlur",
  });
console.log(
  process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
);

const onSubmit = async (data: ContactFormInputs) => {
  try {
    await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        email: data.email,
        subject: data.subject,
        message: data.message,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
    );

    console.log("Email sent successfully, triggering animation");
    
    // Trigger the 3D model animation on successful send
    setPlayAnimation(true);
    
    reset();
  } catch (error) {
    console.error("Email send failed", error);
    alert("Something went wrong. Please try again.");
  }
};

const handleAnimationComplete = () => {
  console.log("Animation complete callback received");
  // Reset animation state after it completes
  setTimeout(() => {
    setPlayAnimation(false);
    console.log("Animation state reset");
  }, 1000);
};


  return (
    <section className={styles.contactSection}>
      <div className={styles.leftcontaner}>
        <Model3DViewer 
          playAnimation={playAnimation} 
          onAnimationComplete={handleAnimationComplete}
        />
      </div>
      <div className={styles.rightcontaner}>
        <header className={styles.contactHeader}>
          <h2>Let’s Work Together</h2>
          <p>
            Have a project, role, or just want to say hi?
            <br />
            Fill out the form and I’ll get back to you.
          </p>
        </header>

        <form
          className={styles.contactForm}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <div className="flex w-full gap-2">
            <div className={styles.formGroup}>
              <label>Email Address *</label>
              <input
                type="email"
                placeholder="john@example.com"
                {...register("email", {
                  required: "Email is required",
                })}
              />
              {errors.email && (
                <span className={styles.error}>{errors.email.message}</span>
              )}
            </div>

            <div className={styles.formGroup}>
              <label>Subject *</label>
              <input
                type="text"
                placeholder="Job / Freelance / Collaboration"
                {...register("subject", {
                  required: "Subject is required",
                })}
              />
              {errors.subject && (
                <span className={styles.error}>{errors.subject.message}</span>
              )}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Message *</label>
            <textarea
              rows={5}
              placeholder="Tell me about your idea..."
              {...register("message", {
                required: "Message is required",
              })}
            />
            {errors.message && (
              <span className={styles.error}>{errors.message.message}</span>
            )}
          </div>
          <button
            className={styles.submitButton}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
