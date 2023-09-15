import { m } from 'framer-motion';
import { useState } from 'react';
import './mailMe.css';
import ReCAPTCHA from 'react-google-recaptcha';

function MailFormModal({ toggleMailModal }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    telephone: '',
    company: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <section className='modal-mail-me'>
      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 30 }}
        className='container'
      >
        <button className='configurator-close-button' onClick={toggleMailModal}>
          X
        </button>
        <h2 className='header-mail-me'>
          Get the shareable web link for your design!
        </h2>

        <div className='configurator-contact-form-container'>
          <div className='configurator-contact-form'>
            <div className='contact-form-left'>
              <div className='text'>
                <p>
                  Use this form to generate a web link to your wheel. This will
                  be sent to the e-mail address you enter and will allow you to
                  view your design or make further changes.
                </p>
                <p>&nbsp;</p>
                <p>
                  If you would like to discuss your design with Cammegh, please
                  fill out all fields and contact our sales team:
                </p>
              </div>
              <div className='email'>
                <h4>CONTACT THE SALES TEAM</h4>
                <p>
                  <a className='sales-email' href='mailto:sales@cammegh.com'>
                    sales@cammegh.com
                  </a>
                </p>
                <p>
                  <a href='tel:+4401233820771'>+44 (0)1233 820771</a>
                </p>
              </div>
            </div>

            <div className='contact-form-right'>
              <div className='form'>
                <form>
                  <div className='main-contact-form'>
                    <div className='details'>
                      <p className='input'>
                        <label htmlFor=''>
                          EMAIL *
                          <span>
                            <input type='text' />
                          </span>
                        </label>
                      </p>
                      <p className='input'>
                        <label htmlFor=''>
                          NAME *
                          <input type='text' />
                        </label>
                      </p>
                      <p className='input'>
                        <label htmlFor=''>
                          COMPANY *
                          <input type='text' />
                        </label>
                      </p>
                      <p className='input'>
                        <label htmlFor=''>
                          <span>
                            TELEPHONE *
                            <span>
                              <input type='text' />
                            </span>
                          </span>
                        </label>
                      </p>
                    </div>
                    <div className='message'>
                      <div className='acceptance'>
                        <p>
                          <p>
                            <input type='checkbox' />
                            <label
                              htmlFor='policy-checkbox'
                              className='policy-checkbox'
                            >
                              I understand GDPR / <span>Privacy Policy</span>
                            </label>
                          </p>
                          <div className='span-captcha'>
                            <ReCAPTCHA
                              size='compact'
                              sitekey='6LcnlAsoAAAAABwH-TbG1EMe5q92sABHXUkVb4yC'
                            />
                          </div>
                        </p>
                      </div>
                      <div className='contact-button-container'>
                        <div className='send-my-link'>
                          <button
                            className='send-link-btn'
                            onClick={(e) => e.preventDefault()}
                            type='submit'
                          >
                            SEND MY LINK
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </section>
  );
}

export default MailFormModal;
