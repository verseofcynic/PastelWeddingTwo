/*
  ============================================================
  EDIT THIS FILE ONLY
  ============================================================
  Change the wedding details, photos, links, colors and text here.
  The rest of the website will update automatically.
*/

window.weddingData = {
  couple: {
    bride: "Riya",
    groom: "Arjun",
    initials: "R & A"
  },

  wedding: {
    // Use local time. Example: "2027-06-12T18:30:00+05:30"
    date: "2027-06-12T18:30:00+05:30",
    displayDate: "12 June 2027",
    day: "Saturday",
    time: "6:30 PM"
  },

  invitation: {
    openingKicker: "THE WEDDING OF",
    heading: "Together with our families",
    message: "We invite you to share in our happiness as we begin this beautiful new chapter together.",
    storyIntro: "From a simple hello to a lifetime of memories, every chapter has led us here."
  },

  venue: {
    name: "Grand Wedding Hall",
    address: "MG Road, Thiruvananthapuram, Kerala",
    mapUrl: "https://maps.google.com/"
  },

  storyTimeline: [
    {
      date: "2019",
      title: "We Met",
      description: "One ordinary day became the beginning of something extraordinary."
    },
    {
      date: "2022",
      title: "The Beginning",
      description: "Somewhere between countless conversations and little adventures, we knew."
    },
    {
      date: "2026",
      title: "The Proposal",
      description: "A beautiful question, a happy yes, and a new chapter waiting to be written."
    },
    {
      date: "2027",
      title: "Forever Starts Here",
      description: "And now we get to celebrate the next chapter with the people we love."
    }
  ],

  events: [
    {
      title: "Engagement",
      date: "10 June 2027",
      time: "6:00 PM",
      venue: "Garden Courtyard",
      address: "Thiruvananthapuram, Kerala",
      icon: "ring",
      mapUrl: "https://maps.google.com/"
    },
    {
      title: "Wedding Ceremony",
      date: "12 June 2027",
      time: "6:30 PM",
      venue: "Grand Wedding Hall",
      address: "MG Road, Thiruvananthapuram, Kerala",
      icon: "heart",
      mapUrl: "https://maps.google.com/"
    },
    {
      title: "Reception",
      date: "12 June 2027",
      time: "8:00 PM",
      venue: "Grand Wedding Hall",
      address: "MG Road, Thiruvananthapuram, Kerala",
      icon: "glass",
      mapUrl: "https://maps.google.com/"
    }
  ],

  gallery: [
    "assets/images/couple-main.svg",
    "assets/images/photo1.svg",
    "assets/images/photo2.svg",
    "assets/images/photo3.svg",
    "assets/images/photo4.svg"
  ],

  families: {
    brideParents: ["Anita & Mahesh", "With love and blessings"],
    groomParents: ["Sunita & Rajesh", "With love and blessings"]
  },

  rsvp: {
    enabled: true,
    message: "Please confirm your presence so we can save a place for you at our celebration.",
    url: "https://forms.google.com/",
    whatsappNumber: "919876543210",
    whatsappMessage: "Hi! I would like to RSVP for Riya & Arjun's wedding."
  },

  music: {
    enabled: false,
    file: "assets/music/wedding.mp3"
  },

  qr: {
    enabled: false,
    image: "assets/images/qr-code.png"
  },

  theme: {
    primaryColor: "#4F5940",
    secondaryColor: "#AAB6A0",
    paperColor: "#F7F3E9",
    textColor: "#30362C",
    accentColor: "#B89B5E"
  }
};
