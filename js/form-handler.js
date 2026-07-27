/**
 * Form submission handler for the recruitment venture site.
 * POSTs form data to the ERPNext proxy server on the VPS.
 */

const PROXY_URL = "https://tech.greenlee.website";

function getApiPath(formId) {
  switch (formId) {
    case 'jobSeekerForm': return '/api/job-seeker';
    case 'employerForm': return '/api/employer';
    case 'contactForm': return '/api/contact';
    default: return '/api/contact';
  }
}

async function submitForm(form, formId) {
  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.textContent = 'Submitting...';
  
  try {
    // Use FormData (handles file uploads) - NOT JSON
    const formData = new FormData(form);
    
    const response = await fetch(PROXY_URL + getApiPath(formId), {
      method: 'POST',
      body: formData
    });
    
    const result = await response.json();
    
    if (result.status === 'ok') {
      alert('Thank you! Your submission was received successfully. We will be in touch soon.');
      form.reset();
    } else {
      alert('There was an error submitting your information. Please try again or contact us directly.');
    }
  } catch (err) {
    console.error('Submission error:', err);
    alert('Error submitting form. Please try again or contact us directly.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Submit';
  }
}

// Wire up forms when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  ['jobSeekerForm', 'employerForm', 'contactForm'].forEach(id => {
    const form = document.getElementById(id);
    if (form) {
      form.addEventListener('submit', function(e) {
        e.preventDefault();
        submitForm(this, this.id);
      });
    }
  });
});
