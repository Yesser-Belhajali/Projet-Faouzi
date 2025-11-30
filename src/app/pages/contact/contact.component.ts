import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  template: `
    <div class="contact-container">
      <div class="container">
        <h1>Contact Us</h1>
        <p>Get in touch with our delivery team</p>
        
        <div class="contact-info">
          <div class="contact-method">
            <h3>📞 Phone</h3>
            <p>+216 123 456 789</p>
          </div>
          
          <div class="contact-method">
            <h3>📧 Email</h3>
            <p>contact@deliveryexpress.tn</p>
          </div>
          
          <div class="contact-method">
            <h3>📍 Address</h3>
            <p>123 Avenue Habib Bourguiba, Tunis</p>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .contact-container {
      min-height: 80vh;
      padding: 4rem 0;
      background: var(--light-gray);
    }
    
    h1 {
      text-align: center;
      color: var(--dark-gray);
      margin-bottom: 1rem;
    }
    
    p {
      text-align: center;
      color: #666;
      margin-bottom: 3rem;
    }
    
    .contact-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 2rem;
      margin-top: 2rem;
    }
    
    .contact-method {
      background: var(--white);
      padding: 2rem;
      border-radius: var(--border-radius);
      box-shadow: var(--shadow);
      text-align: center;
    }
    
    .contact-method h3 {
      color: var(--primary-blue);
      margin-bottom: 1rem;
    }
  `]
})
export class ContactComponent {}