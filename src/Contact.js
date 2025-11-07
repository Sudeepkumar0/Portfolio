import React from "react";
import "./styles/Contact.css";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-inner">
        <div className="contact-left fade-up">
          <h2 className="contact-heading">Get in touch</h2>

          <div className="contact-block">
            <div className="contact-label">Email:</div>
            <div className="contact-value">sudeepkumar.connect@gmail.com</div>
          </div>

          <div className="contact-block">
            <div className="contact-label">Phone:</div>
            <div className="contact-value">+91 8431477305</div>
          </div>

          <div className="contact-block">
            <div className="contact-label">Address:</div>
            <div className="contact-value">Bangalore India</div>
          </div>

          <div className="contact-follow">
            <div className="contact-label">Follow us</div>
            <div className="socials">
              <a
                aria-label="GitHub"
                href="https://github.com/your-username"
                target="_blank"
                rel="noreferrer"
              >
                <FaGithub />
              </a>
              <a
                aria-label="LinkedIn"
                href="https://linkedin.com/in/your-username"
                target="_blank"
                rel="noreferrer"
              >
                <FaLinkedin />
              </a>
              <a
                aria-label="Twitter"
                href="https://twitter.com/your-username"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="contact-right fade-up">
          <form
            className="contact-form"
            onSubmit={(e) => {
              e.preventDefault();
              const form = e.currentTarget;
              const name = form.elements.name.value.trim();
              const email = form.elements.email.value.trim();
              const phone = form.elements.phone
                ? form.elements.phone.value.trim()
                : "";
              const message = form.elements.message.value.trim();
              const subject = encodeURIComponent(
                `Contact from ${name || "Website"}`
              );
              const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`
              );
              window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
            }}
          >
            <div className="top-row">
              <div className="field">
                <label className="field-label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div className="field">
                <label className="field-label">Email address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                />
              </div>
              <div className="field">
                <label className="field-label">Phone</label>
                <input type="tel" name="phone" placeholder="Phone number" />
              </div>
            </div>

            <div className="field">
              <label className="field-label">Message</label>
              <textarea
                name="message"
                id="message"
                placeholder="Write something..."
                rows={6}
              />
            </div>

            <div className="form-actions">
              <button className="btn btn-primary" type="submit">
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
