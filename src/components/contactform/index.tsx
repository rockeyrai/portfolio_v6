import React from "react";
import { useForm } from "react-hook-form";
import styles from "./contactform.module.css";

type ContactFormInputs = {
  email: string;
  subject: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    reset,
  } = useForm<ContactFormInputs>({
    mode: "onBlur",
  });

  const onSubmit = async (data: ContactFormInputs) => {
    try {
      // TODO: Replace with your API / Email service
      console.log("Form Data:", data);

      // Simulate API call
      await new Promise((res) => setTimeout(res, 1000));

      reset();
    } catch (error) {
      console.error("Submission error", error);
    }
  };

  return (
    <section className={styles.contactSection}>
      <div className={styles.leftcontaner}>

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
          {/* Email */}
          <div className={styles.formGroup}>
            <label htmlFor="email">Email Address *</label>
            <input
              id="email"
              type="email"
              style={{with:"100%"}}
              placeholder="john@example.com"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <span className={styles.error}>{errors.email.message}</span>
            )}
          </div>

          {/* Subject */}
          <div className={styles.formGroup}>
            <label htmlFor="subject">Subject *</label>
            <input
              id="subject"
              type="text"
              placeholder="Job Opportunity / Freelance / Collaboration"
              {...register("subject", {
                required: "Subject is required",
              })}
            />
            {errors.subject && (
              <span className={styles.error}>{errors.subject.message}</span>
            )}
          </div>
          </div>


          {/* Message */}
          <div className={styles.formGroup}>
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              rows={5}
              placeholder="Tell me a bit about your idea or role..."
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 10,
                  message: "Message should be at least 10 characters",
                },
              })}
            />
            {errors.message && (
              <span className={styles.error}>{errors.message.message}</span>
            )}
          </div>

          {/* Success Message */}
          {isSubmitSuccessful && (
            <p className={styles.success}>
              Thanks! Your message has been sent successfully.
            </p>
          )}

          {/* Submit */}
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
