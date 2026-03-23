import type { Schema, Struct } from '@strapi/strapi';

export interface FooterContactInfo extends Struct.ComponentSchema {
  collectionName: 'components_footer_contact_infos';
  info: {
    description: 'Contact information for footer';
    displayName: 'Contact Info';
  };
  attributes: {
    address: Schema.Attribute.String;
    email: Schema.Attribute.Email;
    phone: Schema.Attribute.String;
  };
}

export interface FooterLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_links';
  info: {
    description: 'Link for footer navigation';
    displayName: 'Footer Link';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface FooterSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_footer_social_links';
  info: {
    description: 'Social media link for footer';
    displayName: 'Social Link';
  };
  attributes: {
    icon: Schema.Attribute.Media<'images'>;
    platform: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageAbout extends Struct.ComponentSchema {
  collectionName: 'components_homepage_abouts';
  info: {
    description: 'About section with title, content, and image';
    displayName: 'About';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageBeforeAfter extends Struct.ComponentSchema {
  collectionName: 'components_homepage_before_afters';
  info: {
    description: 'Before/After comparison gallery';
    displayName: 'Before After Section';
  };
  attributes: {
    cases: Schema.Attribute.Component<'homepage.before-after-case', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageBeforeAfterCase extends Struct.ComponentSchema {
  collectionName: 'components_homepage_before_after_cases';
  info: {
    description: 'Individual before/after case with images';
    displayName: 'Before After Case';
  };
  attributes: {
    after_image: Schema.Attribute.Media<'images'>;
    before_image: Schema.Attribute.Media<'images'>;
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    treatment: Schema.Attribute.String;
  };
}

export interface HomepageCertificationItem extends Struct.ComponentSchema {
  collectionName: 'components_homepage_certification_items';
  info: {
    description: 'Certification or award badge';
    displayName: 'Certification Item';
  };
  attributes: {
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageCta extends Struct.ComponentSchema {
  collectionName: 'components_homepage_ctas';
  info: {
    description: 'Call-to-action section with text and button';
    displayName: 'CTA';
  };
  attributes: {
    button_label: Schema.Attribute.String & Schema.Attribute.Required;
    button_link: Schema.Attribute.String & Schema.Attribute.Required;
    text: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface HomepageDoctor extends Struct.ComponentSchema {
  collectionName: 'components_homepage_doctors';
  info: {
    description: 'Doctor team showcase';
    displayName: 'Doctor Section';
  };
  attributes: {
    doctors: Schema.Attribute.Component<'homepage.doctor-profile', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageDoctorProfile extends Struct.ComponentSchema {
  collectionName: 'components_homepage_doctor_profiles';
  info: {
    description: 'Individual doctor profile';
    displayName: 'Doctor Profile';
  };
  attributes: {
    bio: Schema.Attribute.Text;
    experience_years: Schema.Attribute.Integer;
    image: Schema.Attribute.Media<'images'>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    specialization: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageFaq extends Struct.ComponentSchema {
  collectionName: 'components_homepage_faqs';
  info: {
    description: 'Frequently asked questions';
    displayName: 'FAQ Section';
  };
  attributes: {
    questions: Schema.Attribute.Component<'homepage.faq-item', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageFaqItem extends Struct.ComponentSchema {
  collectionName: 'components_homepage_faq_items';
  info: {
    description: 'Individual FAQ question and answer';
    displayName: 'FAQ Item';
  };
  attributes: {
    answer: Schema.Attribute.Text & Schema.Attribute.Required;
    question: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageFeatureItem extends Struct.ComponentSchema {
  collectionName: 'components_homepage_feature_items';
  info: {
    description: 'Individual feature in pricing plan';
    displayName: 'Feature Item';
  };
  attributes: {
    included: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageHero extends Struct.ComponentSchema {
  collectionName: 'components_homepage_heroes';
  info: {
    description: 'Hero section with heading, subheading, CTA, and image';
    displayName: 'Hero';
  };
  attributes: {
    cta_label: Schema.Attribute.String;
    cta_link: Schema.Attribute.String;
    heading: Schema.Attribute.String & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    subheading: Schema.Attribute.Text;
  };
}

export interface HomepagePricing extends Struct.ComponentSchema {
  collectionName: 'components_homepage_pricings';
  info: {
    description: 'Pricing plans with features';
    displayName: 'Pricing Section';
  };
  attributes: {
    plans: Schema.Attribute.Component<'homepage.pricing-plan', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepagePricingPlan extends Struct.ComponentSchema {
  collectionName: 'components_homepage_pricing_plans';
  info: {
    description: 'Individual pricing plan';
    displayName: 'Pricing Plan';
  };
  attributes: {
    cta_label: Schema.Attribute.String;
    cta_link: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'homepage.feature-item', true>;
    is_popular: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    period: Schema.Attribute.String;
    price: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageProcess extends Struct.ComponentSchema {
  collectionName: 'components_homepage_processes';
  info: {
    description: 'Step-by-step process';
    displayName: 'Process Section';
  };
  attributes: {
    steps: Schema.Attribute.Component<'homepage.process-step', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageProcessStep extends Struct.ComponentSchema {
  collectionName: 'components_homepage_process_steps';
  info: {
    description: 'Individual step in process';
    displayName: 'Process Step';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageServiceItem extends Struct.ComponentSchema {
  collectionName: 'components_homepage_service_items';
  info: {
    description: 'Individual service with title, description, and icon/image';
    displayName: 'Service Item';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageServices extends Struct.ComponentSchema {
  collectionName: 'components_homepage_services';
  info: {
    description: 'Services section with title and repeatable service items';
    displayName: 'Services';
  };
  attributes: {
    description: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'homepage.service-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageStatItem extends Struct.ComponentSchema {
  collectionName: 'components_homepage_stat_items';
  info: {
    description: 'Individual statistic with number and label';
    displayName: 'Stat Item';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    number: Schema.Attribute.String & Schema.Attribute.Required;
    suffix: Schema.Attribute.String;
  };
}

export interface HomepageTestimonialItem extends Struct.ComponentSchema {
  collectionName: 'components_homepage_testimonial_items';
  info: {
    description: 'Individual testimonial with name, content, and rating';
    displayName: 'Testimonial Item';
  };
  attributes: {
    content: Schema.Attribute.Text & Schema.Attribute.Required;
    name: Schema.Attribute.String & Schema.Attribute.Required;
    rating: Schema.Attribute.Integer &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 1;
        },
        number
      > &
      Schema.Attribute.DefaultTo<5>;
  };
}

export interface HomepageTestimonials extends Struct.ComponentSchema {
  collectionName: 'components_homepage_testimonials';
  info: {
    description: 'Testimonials section with title and repeatable testimonial items';
    displayName: 'Testimonials';
  };
  attributes: {
    items: Schema.Attribute.Component<'homepage.testimonial-item', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageTrust extends Struct.ComponentSchema {
  collectionName: 'components_homepage_trusts';
  info: {
    description: 'Trust indicators with stats and certifications';
    displayName: 'Trust Section';
  };
  attributes: {
    certifications: Schema.Attribute.Component<
      'homepage.certification-item',
      true
    >;
    stats: Schema.Attribute.Component<'homepage.stat-item', true>;
    subtitle: Schema.Attribute.Text;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageVideoHero extends Struct.ComponentSchema {
  collectionName: 'components_homepage_video_heroes';
  info: {
    description: 'Premium video hero section with background video - 2026 design';
    displayName: 'Video Hero Section';
  };
  attributes: {
    ctaLink: Schema.Attribute.String & Schema.Attribute.Required;
    ctaText: Schema.Attribute.String & Schema.Attribute.Required;
    isActive: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<true>;
    overlayOpacity: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 1;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0.4>;
    posterImage: Schema.Attribute.Media<'images'>;
    subtitle: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videoUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MenuLink extends Struct.ComponentSchema {
  collectionName: 'components_menu_links';
  info: {
    displayName: 'Link';
  };
  attributes: {
    href: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface MenuNavChild extends Struct.ComponentSchema {
  collectionName: 'components_menu_nav_children';
  info: {
    description: 'Child navigation item for dropdown menus';
    displayName: 'NavChild';
  };
  attributes: {
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface MenuNavItem extends Struct.ComponentSchema {
  collectionName: 'components_menu_nav_items';
  info: {
    description: 'Navigation item with support for nested children (dropdown)';
    displayName: 'NavItem';
  };
  attributes: {
    children: Schema.Attribute.Component<'menu.nav-child', true>;
    href: Schema.Attribute.String & Schema.Attribute.Required;
    icon: Schema.Attribute.String;
    isExternal: Schema.Attribute.Boolean & Schema.Attribute.DefaultTo<false>;
    label: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'footer.contact-info': FooterContactInfo;
      'footer.link': FooterLink;
      'footer.social-link': FooterSocialLink;
      'homepage.about': HomepageAbout;
      'homepage.before-after': HomepageBeforeAfter;
      'homepage.before-after-case': HomepageBeforeAfterCase;
      'homepage.certification-item': HomepageCertificationItem;
      'homepage.cta': HomepageCta;
      'homepage.doctor': HomepageDoctor;
      'homepage.doctor-profile': HomepageDoctorProfile;
      'homepage.faq': HomepageFaq;
      'homepage.faq-item': HomepageFaqItem;
      'homepage.feature-item': HomepageFeatureItem;
      'homepage.hero': HomepageHero;
      'homepage.pricing': HomepagePricing;
      'homepage.pricing-plan': HomepagePricingPlan;
      'homepage.process': HomepageProcess;
      'homepage.process-step': HomepageProcessStep;
      'homepage.service-item': HomepageServiceItem;
      'homepage.services': HomepageServices;
      'homepage.stat-item': HomepageStatItem;
      'homepage.testimonial-item': HomepageTestimonialItem;
      'homepage.testimonials': HomepageTestimonials;
      'homepage.trust': HomepageTrust;
      'homepage.video-hero': HomepageVideoHero;
      'menu.link': MenuLink;
      'menu.nav-child': MenuNavChild;
      'menu.nav-item': MenuNavItem;
    }
  }
}
