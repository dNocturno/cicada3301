// All content sourced from documented Cicada 3301 research. No fabricated events, quotes, or dates.
// Artifact paths use /artifacts/ prefix — files copied from research repos in build step.
// Sources: krisyotam2 walkthroughs, iddqd archives, ibotpeaches2, uncovering-cicada.fandom.com

export type ArtifactRecord = {
  type: 'image' | 'audio' | 'video' | 'text' | 'map' | 'interactive';
  src: string;
  caption: string;
  sourceUrl: string;
  authenticity: 'confirmed' | 'disputed' | 'reconstructed';
  transcript?: string;
  note?: string;
} | null;

export type DecisionOption = {
  label: string;
  correct: boolean;
  feedback: string;
};

export type Stage = {
  id: number;
  act: 1 | 2 | 3 | 4;
  date: string;
  dateDisplay: string;
  location?: { lat: number; lng: number; name: string };
  title: string;
  narrative: string[];
  artifact: ArtifactRecord;
  decision: {
    question: string;
    options: DecisionOption[];
    noCorrectAnswer?: true;
  };
  resolution: {
    explanation: string;
    additionalMedia?: {
      type: 'image' | 'audio' | 'video' | 'text';
      src: string;
      caption: string;
      sourceUrl: string;
    }[];
  };
  inlineMedia?: {
    afterParagraph: number;
    src: string;
    caption: string;
    sourceUrl: string;
    authenticity: 'confirmed' | 'disputed' | 'reconstructed';
  }[];
  sources: string[];
};

export const stages: Stage[] = [
  // ─────────────────────────────────────────────
  // ACT 1: 2012
  // ─────────────────────────────────────────────
  {
    id: 1,
    act: 1,
    date: '2012-01-04',
    dateDisplay: 'January 4, 2012',
    title: 'The Image Appears',
    narrative: [
      'On January 4, 2012, an anonymous post appeared on 4chan\'s /x/ board — the paranormal and mystery discussion forum. The post contained a single black JPEG image with white text rendered in a monospaced font.',
      'The message read: "Hello. We are looking for highly intelligent individuals. To find them, we have devised a test. There is a message hidden in this image. Find it, and it will lead you on the road to finding us. We look forward to meeting the few who will make it all the way through. Good luck. 3301"',
      'The post was accompanied by the filename "Hello." The image dimensions were 509×503 pixels — both prime numbers, a detail that would only become significant later. The post was signed with the number 3301, which would become the organization\'s identifier. Within hours, thousands of users were examining the image for hidden content.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2012-original-4chan-image.jpg',
      caption: 'Original image posted to 4chan /x/, January 4, 2012. Dimensions: 509×503 pixels.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'You are among the first to see this image on 4chan. What is your immediate instinct?',
      options: [
        {
          label: 'Examine the image file itself for hidden data',
          correct: true,
          feedback: 'Correct approach. The image contains steganographic data embedded using the OutGuess tool. Running OutGuess on the JPEG reveals a PGP-signed message — the first step in the chain.',
        },
        {
          label: 'Search the image text for a cipher',
          correct: false,
          feedback: 'The visible text is not itself encoded. The clue lies deeper — embedded in the image\'s bit structure, not its visible content.',
        },
        {
          label: 'Look up "3301" to identify the sender',
          correct: false,
          feedback: 'This is a dead end at this stage. The number 3301 is deliberately anonymous. The puzzle proceeds through the image itself, not through external searches about the sender.',
        },
      ],
    },
    resolution: {
      explanation: 'Solvers ran the OutGuess steganography tool against the JPEG. OutGuess, a program that hides data in the redundant bits of image files, extracted a PGP-signed message pointing to a Reddit thread. The image dimensions (509×503) were also meaningful: both are prime numbers, and their product with 3301 equals 845145127 — the domain name of the next step.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
      'https://connortumbleson.com/2021/01/18/the-cicada-3301-mystery/',
    ],
  },

  {
    id: 2,
    act: 1,
    date: '2012-01-05',
    dateDisplay: 'January 5–6, 2012',
    title: 'OutGuess and the PGP Key',
    narrative: [
      'Running the open-source OutGuess steganography tool against the original JPEG extracted a hidden PGP-signed message. OutGuess works by embedding data in the least-significant bits of a JPEG\'s DCT coefficients — changes imperceptible to the human eye but recoverable with the correct tool.',
      'The extracted message was signed with PGP key ID 7A35090F (full fingerprint: 0x181F01E57A35090F). Every subsequent authentic Cicada 3301 message would be signed with this same key, allowing verification of legitimacy. The community used this signature to distinguish real Cicada communications from impostors throughout the following years.',
      'The message itself read: "WOOPS Just decoys this way. Looks like you can\'t guess, Pirats." — a misdirection. A second image ("Problems?") contained the real message: "The key has always been right in front of your eyes. This isn\'t the quest for the Holy Grail. Stop making it more difficult than it is. Good luck. 3301"',
      'The key referenced in the "Problems" message was the subreddit URL — the hexadecimal full name of the Reddit page [r/a2e7j6ic78h0j](https://www.reddit.com/r/a2e7j6ic78h0j/), which decoded to a numeric sequence used to unlock the scrambled Mabinogion text posted there.',
    ],
    artifact: {
      type: 'text',
      src: '/artifacts/2012-outguess-pgp-message.txt',
      caption: 'PGP-signed message extracted from 8D7hN.jpg ("Problems?") via OutGuess. Signed January 7, 2012, RSA key ID 7A35090F.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
      authenticity: 'confirmed',
      transcript: '-----BEGIN PGP SIGNED MESSAGE-----\nHash: SHA1\n\nThe key has always been right in front of your eyes.\n\nThis isn\'t the quest for the Holy Grail.  Stop making \nit more difficult than it is. \n\nGood luck.\n\n3301\n-----BEGIN PGP SIGNATURE-----\n[...signature block...]',
    },
    decision: {
      question: 'The PGP message says "the key has always been right in front of your eyes." What does this mean?',
      options: [
        {
          label: 'The subreddit URL itself is the cipher key',
          correct: true,
          feedback: 'Correct. The Reddit page\'s full internal name — a2e7j6ic78h0j7eiejd0120 — is hexadecimal. Converting it produces the numeric sequence 10, 2, 14, 7, 19, 6, 18, 12, 7, 8, 17, 0, 19, 7, 14, 18, 14, 19, 13, 0, 1, 2, 0. This was the key to decode the scrambled Mabinogion text.',
        },
        {
          label: 'The PGP key ID 7A35090F is itself a message',
          correct: false,
          feedback: 'The PGP key is a verification tool, not the cipher key referenced here. The "key" in this context is the hexadecimal subreddit name.',
        },
        {
          label: 'The image filename contains the key',
          correct: false,
          feedback: 'The filenames are identifiers, not the decoding key. The key was literally visible all along — the URL of the page you were reading.',
        },
      ],
    },
    resolution: {
      explanation: 'The subreddit r/a2e7j6ic78h0j contained a post with scrambled text. The subreddit\'s full internal Reddit name (a2e7j6ic78h0j7eiejd0120) is hexadecimal, converting to the sequence 10,2,14,7,19,6,18,12... This was a Caesar-style shift cipher key. Applying it to the scrambled text revealed the opening passage of The Mabinogion — a Welsh mythology text that was then used as the book cipher source.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
      'https://connortumbleson.com/2021/01/18/the-cicada-3301-mystery/',
    ],
  },

  {
    id: 3,
    act: 1,
    date: '2012-01-06',
    dateDisplay: 'January 6, 2012',
    title: 'The Book Cipher',
    narrative: [
      'The Reddit post [r/a2e7j6ic78h0j](https://www.reddit.com/r/a2e7j6ic78h0j/) contained a scrambled passage. Once decoded using the hexadecimal subreddit name as a shift key, it revealed a passage from The Mabinogion — an 11th-century collection of Welsh mythology. The decoding process required shifting each character in the scrambled text by the corresponding number in the key sequence.',
      'The decoded Mabinogion passage began: "King Arthur was at Caerlleon upon Usk; and one day he sat in his chamber; and with him were Owain the son of Urien, and Kynon the son of Clydno..." This was the source text for a book cipher hidden in the two OutGuess messages.',
      'The book cipher used line:character notation. For example, "1:29" meant line 1, character 29 of the Mabinogion passage. Working through the cipher table — which included special entries like "the product of the first two primes" (= 6, for \'f\') and "the first prime" (= 2, for \'b\') — produced the sentence: "Call us at us telephone number two one four three nine oh nine six oh eight."',
      'The phone number was: (214) 390-9608.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2012-subreddit-header.png',
      caption: 'Header image from r/a2e7j6ic78h0j. The subreddit\'s full internal name (a2e7j6ic78h0j7eiejd0120) is the cipher key.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'The book cipher references "the product of the first two primes" instead of giving a position number. What value does this represent?',
      options: [
        {
          label: '6 (2 × 3 = 6, character position 6)',
          correct: true,
          feedback: 'Correct. The first two primes are 2 and 3. Their product is 6. The cipher used this mathematical expression to encode certain positions — consistent with Cicada\'s pattern of embedding prime number significance throughout their puzzles.',
        },
        {
          label: '15 (3 × 5 = 15)',
          correct: false,
          feedback: 'The first two primes are 2 and 3, not 3 and 5. 5 is the third prime. Their product is 6.',
        },
        {
          label: '10 (2 × 5 = 10)',
          correct: false,
          feedback: 'The first two primes are 2 and 3. The product is 6.',
        },
      ],
    },
    resolution: {
      explanation: 'The complete book cipher decoded to "Call us at us telephone number two one four three nine oh nine six oh eight" — the phone number (214) 390-9608. The use of mathematical expressions for prime products was an early signal of Cicada\'s preoccupation with prime numbers, which would become central to Liber Primus two years later.',
    },
    inlineMedia: [
      {
        afterParagraph: 1,
        src: '/artifacts/mabinogion-manuscript.jpg',
        caption: 'Jesus College MS 111 — a medieval Welsh manuscript containing the Mabinogion tales used as the book cipher source in 2012. Public domain.',
        sourceUrl: 'https://commons.wikimedia.org/wiki/File:Jesus-College-MS-111_00349_175r_(cropped_%26_lightened).jpg',
        authenticity: 'confirmed',
      },
    ],
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
    ],
  },

  {
    id: 4,
    act: 1,
    date: '2012-01-07',
    dateDisplay: 'January 7–9, 2012',
    title: 'The Phone Recording',
    narrative: [
      'Calling (214) 390-9608 connected to a pre-recorded message. The recording said: "Very good. You have done well. There are three prime numbers associated with the original final.jpg image. 3301 is one of them. You will have to find the other two. Multiply all three of these numbers together and add a .com to find the next step. Good luck. Goodbye."',
      'The original 4chan image was 509 pixels wide and 503 pixels tall. Both 509 and 503 are prime numbers. Multiplying all three primes together: 509 × 503 × 3301 = 845,145,127.',
      'Adding ".com" gave the URL [845145127.com](https://web.archive.org/web/20120109000000*/845145127.com) — a website that was already live and waiting.',
    ],
    artifact: {
      type: 'audio',
      src: 'k24ZrFR2IUQ',
      caption: 'Phone recording from (214) 390-9608. YouTube upload of original message; phone number has since been deactivated.',
      sourceUrl: 'https://www.youtube.com/watch?v=k24ZrFR2IUQ',
      authenticity: 'confirmed',
      transcript: 'Very good. You have done well. There are three prime numbers associated with the original final.jpg image. 3301 is one of them. You will have to find the other two. Multiply all three of these numbers together and add a .com to find the next step. Good luck. Goodbye.',
    },
    decision: {
      question: 'The recording says the image has three associated prime numbers and 3301 is one. The image is 509×503 pixels. What is the next URL?',
      options: [
        {
          label: '845145127.com (509 × 503 × 3301)',
          correct: true,
          feedback: 'Correct. 509 and 503 are both prime. 509 × 503 × 3301 = 845,145,127. The website 845145127.com was already live, hosting the cicada image and a PGP-signed countdown message.',
        },
        {
          label: '3301509503.com',
          correct: false,
          feedback: 'The instruction was to multiply the three primes, not concatenate them. 509 × 503 × 3301 = 845,145,127.',
        },
        {
          label: 'Look for a fourth prime in the image metadata',
          correct: false,
          feedback: 'The recording specified exactly three primes. The image dimensions (509, 503) combined with 3301 are the three.',
        },
      ],
    },
    resolution: {
      explanation: '509 × 503 × 3301 = 845,145,127. The website 845145127.com displayed the Tosena splendida cicada photograph — taken by photographer Pascal Goetgheluck on April 24, 2008 — along with a countdown timer. Running OutGuess on the cicada image revealed another PGP-signed message: coordinates and a timer set to 17:00 UTC on January 9, 2012.',
      additionalMedia: [
        {
          type: 'image',
          src: '/artifacts/2012-cicada-845145127.jpg',
          caption: 'The Tosena splendida cicada image from 845145127.com. Original photo by Pascal Goetgheluck.',
          sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
        },
      ],
    },
    inlineMedia: [
      {
        afterParagraph: 1,
        src: '/artifacts/2012-cicada-845145127.jpg',
        caption: 'Tosena splendida cicada image from 845145127.com. Photo by Pascal Goetgheluck, April 24, 2008.',
        sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
        authenticity: 'confirmed',
      },
    ],
    sources: [
      'https://www.youtube.com/watch?v=k24ZrFR2IUQ',
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
    ],
  },

  {
    id: 5,
    act: 1,
    date: '2012-01-09',
    dateDisplay: 'January 9, 2012 — 17:00 UTC',
    title: 'Fourteen Coordinates',
    narrative: [
      'At exactly 17:00 UTC on January 9, 2012, the 845145127.com website changed. The countdown expired and a string of fourteen geographic coordinates appeared on the page. OutGuessing the cicada image again at this time produced a PGP-signed message containing the same coordinates.',
      'The fourteen locations spanned five continents: Warsaw (Poland), Paris (two addresses), Seattle (three addresses), Seoul (two addresses), Fayetteville (Arkansas), Chino (California), New Orleans (Louisiana), Miami (Florida), Haleiwa (Hawaii), and Erskineville (Sydney, Australia).',
      'The message was signed by Cicada\'s PGP key, confirming authenticity. The final line read simply: "3301."',
      'The coordinates were not explained. No instructions accompanied them. Solvers had to figure out on their own that these were real-world locations to visit physically.',
    ],
    artifact: {
      type: 'map',
      src: 'coordinates-2012',
      caption: '14 GPS coordinates published January 9, 2012 at 17:00 UTC. Cicada 3301 PGP key 7A35090F.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
      authenticity: 'confirmed',
      transcript: '52.216802, 21.018334 — Oleandrów 6, Warsaw, Poland\n48.85057059876962, 2.406892329454422 — 89-91 Rue de la Plaine, Paris, France\n48.85030144151387, 2.407538741827011 — 36 Rue des Maraîchers, Paris, France\n47.664196, -122.313301 — 4739 University Way NE, Seattle, WA\n47.637520, -122.346277 — 514 Crockett St, Seattle, WA\n47.622993, -122.312576 — 428 15th Ave E, Seattle, WA\n37.577070, 126.813122 — Gangseo-gu, Seoul, South Korea\n37.5196666666667, 126.995 — Yongsan-gu, Seoul, South Korea\n36.0665472222222, -94.1726416666667 — W Dickson St, Fayetteville, AR\n33.966808, -117.650488 — Euclid Ave, Chino, CA\n29.909098706850486, -89.99312818050384 — State Hwy 407, New Orleans, LA\n25.684702, -80.441289 — SW 152nd Ave, Miami, FL\n21.584069, -158.104211 — Kamehameha Hwy, Haleiwa, HI\n-33.90281, 151.18421 — George St, Erskineville, Sydney, Australia',
    },
    decision: {
      question: 'Fourteen coordinates appear on the screen. There are no instructions. What do you do?',
      options: [
        {
          label: 'Go to the nearest location physically and look for something',
          correct: true,
          feedback: 'This was the correct instinct. People who lived near or traveled to the coordinates found white paper posters attached to streetlight poles. The posters featured the cicada stencil and a QR code linking to the next puzzle step.',
        },
        {
          label: 'Search the coordinates for patterns or mathematical relationships',
          correct: false,
          feedback: 'While Cicada did embed mathematical patterns throughout the puzzle, the coordinates were literal GPS locations. The puzzle required physical presence — a deliberate design choice to limit the number of simultaneous solvers.',
        },
        {
          label: 'Use the coordinates as cipher keys for the earlier messages',
          correct: false,
          feedback: 'The coordinates were not cipher keys. They were real-world addresses where physical posters had been placed.',
        },
      ],
    },
    resolution: {
      explanation: 'People near the coordinates visited the locations and found cicada stencil posters taped to streetlight poles. Each poster included a QR code. Confirmed finds included Warsaw, Paris, Miami, Fayetteville (Arkansas), and Sydney. The QR codes linked to unique image URLs on 845145127.com, each containing another OutGuess-encoded message.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
    ],
  },

  {
    id: 6,
    act: 1,
    date: '2012-01-09',
    dateDisplay: 'January 9–15, 2012',
    title: 'Physical Posters and the Agrippa Cipher',
    location: { lat: 52.216802, lng: 21.018334, name: 'Oleandrów 6, Warsaw, Poland' },
    narrative: [
      'Participants who visited the GPS coordinates found white paper posters stenciled with a cicada image and a QR code. The QR codes linked to unique image files on 845145127.com. Each image again contained OutGuess-embedded data.',
      'The OutGuess-decoded messages from the physical locations were different from each other, but they all contained a book cipher — this time referencing [William Gibson\'s "Agrippa (A Book of the Dead)"](https://en.wikipedia.org/wiki/Agrippa_(A_Book_of_the_Dead)) (1992). Agrippa is a poem distributed on floppy disk, designed to encrypt itself and become unreadable after a single viewing. Its use was not accidental.',
      'Message 1 (from Arkansas and Miami images) opened: "In twenty-nine volumes, knowledge was once contained. How many lines of the code remained when the Mabinogion paused? Go that far in from the beginning and find my first name." It then listed book cipher coordinates.',
      'Message 2 (from Warsaw and Sydney images) opened: "A poem of fading death, named for a king / Meant to be read only once and vanish / Alas, it could not remain unseen." The book cipher entries for both messages decoded to .onion addresses — Tor hidden services.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2012-poster-warsaw.jpg',
      caption: 'Physical cicada poster found at Oleandrów 6, Warsaw, Poland. White paper with cicada stencil and QR code.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'The cipher clue says "A poem of fading death, named for a king, meant to be read only once and vanish." Which text does this describe?',
      options: [
        {
          label: 'William Gibson\'s "Agrippa (A Book of the Dead)"',
          correct: true,
          feedback: 'Correct. Agrippa is a 1992 poem by William Gibson distributed on floppy disk with self-encrypting software that made the text unreadable after a single display. "Named for a king" refers to Agrippa — a name associated with Roman royalty. Cicada used it as the source text for their book cipher.',
        },
        {
          label: 'The Mabinogion (same source as before)',
          correct: false,
          feedback: 'The Mabinogion was used earlier. The clue "a poem of fading death, meant to be read only once and vanish" points specifically to Agrippa, which was designed to self-destruct after one reading.',
        },
        {
          label: 'The Epic of Gilgamesh',
          correct: false,
          feedback: 'Gilgamesh is ancient Mesopotamian epic poetry, not "a poem of fading death meant to be read only once." The clue describes a specific modern work: William Gibson\'s Agrippa.',
        },
      ],
    },
    resolution: {
      explanation: 'The Agrippa book cipher decoded to .onion URLs — Tor hidden service addresses. This required participants to install Tor Browser, marking the end of the public-facing puzzle and the beginning of a private, anonymous phase. The use of Agrippa — a text literally designed to self-destruct — was a deliberate philosophical statement about ephemerality and privacy.',
      additionalMedia: [
        {
          type: 'image',
          src: '/artifacts/2012-poster-paris.jpg',
          caption: 'Physical cicada poster found near 89-91 Rue de la Plaine, Paris, France.',
          sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
        },
        {
          type: 'image',
          src: '/artifacts/2012-poster-miami.jpg',
          caption: 'Physical cicada poster found at 8718-8798 SW 152nd Ave, Miami, FL.',
          sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
        },
      ],
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
      'https://en.wikipedia.org/wiki/Agrippa_(A_Book_of_the_Dead)',
    ],
  },

  {
    id: 7,
    act: 1,
    date: '2012-01-15',
    dateDisplay: 'January 15–31, 2012',
    title: 'Into the Onion Network',
    narrative: [
      'The .onion addresses from the Agrippa cipher led to Tor hidden services — websites accessible only through the Tor anonymity network. Accessing them required installing Tor Browser and understanding how the network\'s routing worked.',
      'The onion sites ran interactive challenges. Each participant received a unique RSA modulus factoring puzzle — a large semi-prime number that had to be factored into its two prime components. This was computationally intensive but not infeasible, and was designed to confirm that participants understood public-key cryptography.',
      'A MIDI file was also part of the 2012 onion challenge. The musical puzzle required participants to analyze the audio data for embedded content.',
      'A "second chance" message appeared later, referencing John William Waterhouse\'s 1888 painting ["The Lady of Shalott"](https://en.wikipedia.org/wiki/The_Lady_of_Shalott_(painting)) and William Blake\'s work — literary references consistent with Cicada\'s recurring use of Romantic and Victorian-era texts. Those who had shared solutions publicly were excluded; those who had worked privately remained in contention.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2012-lady-of-shalott.jpg',
      caption: '"The Lady of Shalott" — referenced in the 2012 second chance message. The painting depicts a figure who must not look at the world directly, only through a mirror.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'The second chance message warns those who shared solutions publicly are excluded. What principle does this reflect?',
      options: [
        {
          label: 'Cicada was selecting for operational security awareness',
          correct: true,
          feedback: 'Correct. Cicada\'s stated goal was finding individuals capable of working on privacy-critical projects. Sharing puzzle solutions publicly demonstrated a lack of discretion. The selection process was explicitly filtering for people who understood the value of secrecy.',
        },
        {
          label: 'Cicada wanted to keep the puzzle secret longer',
          correct: false,
          feedback: 'The puzzle was already widely public. The exclusion of sharers was not about puzzle secrecy but about evaluating candidates\' judgment and operational security instincts.',
        },
        {
          label: 'It was a legal protection measure',
          correct: false,
          feedback: 'There is no evidence this was legally motivated. The selection criterion was behavioral — testing whether candidates understood when discretion mattered.',
        },
      ],
    },
    resolution: {
      explanation: 'Winners who passed all onion challenges were admitted to a PGP-gated private forum in February 2012. They were assigned tasks related to privacy tools, cryptography, and censorship-resistant communication. The nature of the tasks confirmed that Cicada was recruiting technically skilled individuals for a specific operational purpose, not simply running an academic puzzle.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
      'https://connortumbleson.com/2021/01/18/the-cicada-3301-mystery/',
    ],
  },

  {
    id: 8,
    act: 1,
    date: '2012-02-01',
    dateDisplay: 'February 2012',
    title: 'Winners and the Private Forum',
    narrative: [
      'A small number of participants who completed the full 2012 puzzle chain were admitted to a PGP-gated private forum. Access required encrypting a specific response with the Cicada PGP key and receiving an encrypted reply with credentials. The barrier was technical by design.',
      'Inside the forum, winners were given tasks. The specific content remains private — no confirmed winner has publicly disclosed full details of what was asked of them. What has been reconstructed from partial accounts is that the work involved privacy tools, cryptography implementation, and censorship-resistant communication systems.',
      'This was the endpoint of the 2012 puzzle. Cicada then went silent until January 4, 2013 — exactly one year after the first image was posted. The pattern of January 4th posting dates would hold for subsequent years, suggesting a deliberate calendar.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2012-welcome-image.jpg',
      caption: '"Welcome" image associated with the 2012 puzzle completion pathway.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'A winner inside the 2012 forum is asked to work on "censorship-resistant communication tools." What type of organization would assign this task?',
      options: [
        {
          label: 'A privacy-focused group or intelligence-adjacent organization',
          correct: true,
          feedback: 'The task profile — privacy tools, censorship resistance, anonymous communication — fits several categories: civil liberties organizations, intelligence agencies recruiting technical talent, or independent researchers building the infrastructure for free speech. All remain plausible. No definitive identification has been made.',
        },
        {
          label: 'A commercial software company',
          correct: false,
          feedback: 'The recruitment method — anonymous international puzzle, PGP authentication, no branding or company identity — is inconsistent with commercial hiring practices. Commercial entities have legal obligations that preclude this level of anonymity.',
        },
        {
          label: 'An academic research institution',
          correct: false,
          feedback: 'Academic institutions operate under legal and institutional frameworks that require transparency about affiliation. A fully anonymous academic recruitment would be unprecedented and structurally impossible.',
        },
      ],
    },
    resolution: {
      explanation: 'The 2012 puzzle was complete. Cicada had recruited an unknown number of participants through a chain that tested steganography awareness, cryptography knowledge, mathematical thinking, operational security, and willingness to physically travel to GPS coordinates. The full scope of what winners were asked to build remains unknown. On January 4, 2013, a new image appeared on 4chan.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2012)',
      'https://connortumbleson.com/2021/01/18/the-cicada-3301-mystery/',
    ],
  },

  // ─────────────────────────────────────────────
  // ACT 2: 2013
  // ─────────────────────────────────────────────
  {
    id: 9,
    act: 2,
    date: '2013-01-04',
    dateDisplay: 'January 4, 2013',
    title: 'The Second Round',
    narrative: [
      'Exactly one year after the first image, a new image appeared on 4chan. The 2013 puzzle began with a JPEG posted to the same /x/ board. The Cicada pattern was now recognizable: January 4th, an image with hidden content, PGP-signed verification.',
      'The 2013 image contained OutGuess data that led to Twitter account [@1231507051321](https://twitter.com/1231507051321) — a sequence of prime numbers. The Twitter account posted clues throughout the puzzle chain.',
      'The 2013 puzzle introduced two elements that would define Cicada\'s identity going forward: the Gematria Primus cipher system and the Cicada OS — a custom bootable Linux ISO that was central to the puzzle\'s middle section.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2013-original-image.jpg',
      caption: 'Original image posted to 4chan /x/ on January 4, 2013. Starting point for the second puzzle round.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2013)',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'The Twitter handle is @1231507051321. Is this significant?',
      options: [
        {
          label: 'Yes — these are all prime numbers in sequence',
          correct: true,
          feedback: 'Correct. 1, 2, 3, 1, 5, 0, 7, 0, 5, 1, 3, 2, 1 — reading it differently: 1, 2, 3, 5, 7, 11, 13... The handle encodes the beginning of the prime number sequence (with 0s as separators or positional markers). Prime numbers are a recurring motif throughout all Cicada puzzles.',
        },
        {
          label: 'No — it\'s a random account identifier',
          correct: false,
          feedback: 'Cicada chose every element deliberately. The Twitter handle encodes the prime number sequence — consistent with the 845145127.com domain (product of three primes) and the image dimensions (509×503, both prime) from 2012.',
        },
        {
          label: 'It\'s a date in compressed numeric format',
          correct: false,
          feedback: 'The digits do not map to a standard date. They correspond to prime numbers: 2, 3, 5, 7, 13...',
        },
      ],
    },
    resolution: {
      explanation: 'The Twitter account @1231507051321 was used to post clues and coordinates throughout the 2013 puzzle, and remained active through at least 2017. The prime sequence in the handle reinforced a central Cicada theme: mathematics, particularly number theory, as a foundation for their cipher systems.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2013)',
      'https://connortumbleson.com/2021/01/25/the-cicada-3301-mystery-puzzle-2/',
    ],
  },

  {
    id: 10,
    act: 2,
    date: '2013-01-15',
    dateDisplay: 'January–February 2013',
    title: 'The Bootable ISO',
    narrative: [
      'A critical discovery in the 2013 puzzle was a bootable Linux ISO — [3301.iso](https://archive.org/details/3301.iso) — approximately 130 megabytes in size. It was based on Tiny Core Linux and designed to be written to a USB drive and booted directly.',
      'The boot sequence displayed prime numbers counting upward: 3, 5, 7, 11, 13... until reaching 3301. The message "@1231507051321 The key is all around you. Good luck. 3301" appeared during boot.',
      'The ISO contained audio files with steganographic content and a custom environment for solving the next phase of the puzzle. The boot sequence itself contained the number 1033 displayed before the final 3301 — 1033 is also a prime number.',
      'Audio files in the ISO, when processed with specific tools, revealed further clues. Twitter hex codes from @1231507051321 XOR\'d with data from 761.mp3 produced additional message content.',
    ],
    artifact: {
      type: 'text',
      src: '/artifacts/2013-iso-readme.txt',
      caption: 'Cicada OS (3301.iso) — bootable Linux ISO, ~130MB, based on Tiny Core Linux. Available at Internet Archive.',
      sourceUrl: 'https://archive.org/details/3301.iso',
      authenticity: 'confirmed',
      note: 'ISO not included in artifacts. See Internet Archive link.',
      transcript: 'Boot message: "@1231507051321 The key is all around you. Good luck. 3301"\nBoot sequence displays primes: 3, 5, 7, 11... 3301\n1033 displayed before final 3301 — both prime.',
    },
    decision: {
      question: 'The ISO boot sequence shows primes up to 3301, then "1033" before the final number. What is the significance of 1033?',
      options: [
        {
          label: '1033 is a prime number — it belongs in the sequence',
          correct: true,
          feedback: 'Correct. 1033 is prime. Its inclusion just before 3301 in the boot sequence is not accidental. Cicada embedded prime numbers not as puzzles to solve but as a consistent symbolic language — primes appear throughout their communications as both functional cipher elements and philosophical statements about indivisibility.',
        },
        {
          label: '1033 is a year — a historical date reference',
          correct: false,
          feedback: '1033 CE is the year of the founding of Normandy, but there is no documented Cicada connection to this date. In context of the prime sequence, 1033 is a prime number.',
        },
        {
          label: '1033 is a decoy — only 3301 matters',
          correct: false,
          feedback: 'In Cicada\'s work, few elements are decoys. 1033 is prime and belongs to the same mathematical language used throughout. Its placement is deliberate.',
        },
      ],
    },
    resolution: {
      explanation: 'The ISO could be downloaded from a Cicada-provided address and booted on any PC. Its contents — a custom Linux environment, audio files with steganographic data, and specific tooling — formed a self-contained puzzle environment. The use of a bootable ISO was a significant escalation from 2012: participants now needed to understand Linux, audio steganography, and the XOR operation to proceed.',
    },
    sources: [
      'https://archive.org/details/3301.iso',
      'https://uncovering-cicada.fandom.com/wiki/ISO_CD',
      'https://uncovering-cicada.fandom.com/wiki/Files_found_in_Cicada_OS',
    ],
  },

  {
    id: 11,
    act: 2,
    date: '2013-02-01',
    dateDisplay: '2013',
    title: 'Gematria Primus',
    narrative: [
      'The 2013 puzzle formally introduced the Gematria Primus — Cicada\'s custom cipher system. It mapped 29 Anglo-Saxon Elder Futhark runes to the first 29 prime numbers.',
      'The cipher assigned each rune both a phonetic value (the letter or digraph it represents) and a numerical value (its corresponding prime). For example: ᚠ (F) = 2, ᚢ (U/V) = 3, ᚦ (TH) = 5, ᚨ (A) = 7, ᚱ (R) = 11, ᚲ (K/C) = 13, and so on through the 29 runes, with the 29th prime being 109.',
      'The Gematria Primus was not just a substitution cipher. Because each rune had a prime number value, text could also be processed mathematically — summed, multiplied, applied through Euler\'s totient function. The system enabled layered encryption where rune sequences were both readable phonetically and processable arithmetically.',
      'This system would become the foundation of Liber Primus, released the following year.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2013-gematria-primus-table.jpg',
      caption: 'Gematria Primus rune table. 29 Elder Futhark runes mapped to the first 29 prime numbers.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/Gematria_Primus',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'The 29 runes are mapped to the first 29 primes. Why 29 specifically?',
      options: [
        {
          label: 'The Anglo-Saxon Futhorc alphabet has 29 base runes',
          correct: true,
          feedback: 'Correct. The Elder Futhark has 24 runes; the Anglo-Saxon Futhorc extends it to 28–33 depending on the variant. Cicada\'s Gematria Primus uses 29 runes — matching the count to the first 29 prime numbers (2 through 109). The alignment is deliberate: the number of symbols in the writing system determines the length of the prime sequence.',
        },
        {
          label: '29 is itself a prime number — chosen for symbolic reasons',
          correct: false,
          feedback: 'While 29 is prime, the count was determined by the rune alphabet, not chosen for the symbolic value of 29. The Gematria Primus was built by matching the existing alphabet to primes, not by choosing a prime-count target.',
        },
        {
          label: 'It was an arbitrary design decision',
          correct: false,
          feedback: 'Nothing in Cicada\'s cipher design appears arbitrary. The 29 runes correspond to the Anglo-Saxon Futhorc alphabet count.',
        },
      ],
    },
    resolution: {
      explanation: 'Gematria Primus became the foundational encoding system for everything Cicada produced after 2013, including Liber Primus. Understanding it required knowing both the rune-to-letter mappings and the rune-to-prime-number mappings. Solvers who cracked Liber Primus pages used Gematria Primus transliteration combined with Vigenère cipher, prime-based key derivation, and Euler\'s totient function.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/Gematria_Primus',
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_1_(2013)',
    ],
  },

  {
    id: 12,
    act: 2,
    date: '2013-03-01',
    dateDisplay: '2013',
    title: 'The Instar Emergence',
    narrative: [
      '761.mp3 — titled "The Instar Emergence" — was a guitar track discovered as part of the 2013 puzzle chain. It contained reversed and distorted audio elements that required careful analysis.',
      'The track ran for exactly 2 minutes and 47 seconds: 167 seconds. Both 167 and 761 are prime numbers. 167 is also the emirp of 761 — meaning 761 reversed gives 167, which is also prime. The title "The Instar Emergence" sums to 761 in Gematria Primus values.',
      'The ID3 metadata tag embedded in the MP3 file contained a hidden poem: "Parable 1,595,277,641 / Like the instar, tunneling to the surface / We must shed our own circumferences; / Find the divinity within and emerge."',
      'An instar is a developmental stage of an insect between moults — the larval form tunneling through soil before emerging as an adult. The metaphor recurred throughout Cicada\'s philosophical texts: transformation, emergence, shedding false identity. The number 1,595,277,641 in the parable line is a semiprime (product of two primes).',
    ],
    artifact: {
      type: 'audio',
      src: '/artifacts/2013-instar-emergence-761.mp3',
      caption: '"The Instar Emergence" (761.mp3). Duration: 2:47 (167 seconds). Gematria Primus value of title: 761. Both 167 and 761 are prime.',
      sourceUrl: 'https://archive.org/details/cicada-761',
      authenticity: 'confirmed',
      transcript: 'ID3 hidden poem: "Parable 1,595,277,641 / Like the instar, tunneling to the surface / We must shed our own circumferences; / Find the divinity within and emerge."',
    },
    decision: {
      question: 'The parable number is 1,595,277,641. The poem says to "find the divinity within." What does this suggest?',
      options: [
        {
          label: 'Factor the number — its prime factors are the next clue',
          correct: true,
          feedback: '1,595,277,641 = 39,941 × 39,901. Both factors are prime. The instruction to "find the divinity within" — the inner prime structure of the number — was consistent with Cicada\'s approach of embedding puzzle instructions in philosophical language. The factors appeared in subsequent steps of the 2013 chain.',
        },
        {
          label: 'Use 1,595,277,641 as a Gematria Primus value to look up a rune',
          correct: false,
          feedback: 'Gematria Primus covers only the first 29 primes (up to 109). This number far exceeds that range. The instruction points toward factorization.',
        },
        {
          label: 'The number is decorative — only the poem text matters',
          correct: false,
          feedback: 'In Cicada\'s design, no numbers are decorative. 1,595,277,641 is a semiprime whose factors are meaningful.',
        },
      ],
    },
    resolution: {
      explanation: 'The instar metaphor — an insect tunneling through darkness before emergence — was Cicada\'s recurring image for the transformation they claimed their puzzle demanded of participants. The philosophical content was not decoration; it described the recruitment process itself. Solvers who emerged on the other side were expected to have genuinely changed their approach to privacy and cryptography.',
    },
    sources: [
      'https://archive.org/details/cicada-761',
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_2_(2013)',
    ],
  },

  {
    id: 13,
    act: 2,
    date: '2013-04-01',
    dateDisplay: '2013',
    title: 'The Telnet Shell',
    narrative: [
      'The 2013 puzzle led to a Tor hidden service at emiwp4muu2ktwknf.onion, accessible via telnet. The interactive shell presented a custom protocol with specific commands: RAND, QUINE, BASE29, CODE, KOAN, DH, NEXT, GOODBYE.',
      'Participants were instructed to create their own Tor hidden services with CGI file upload capability, then post magic squares — mathematical grids where every row, column, and diagonal sums to the same value — along with their .onion URLs.',
      'Each participant received a unique set of numeric encryption puzzles. The uniqueness was deliberate: it allowed Cicada to detect and exclude anyone who shared their answers, since identical responses from different participants would be statistically impossible.',
      'The ICMP (ping) steganography method was used to transmit data through seemingly normal network traffic. The 2013 physical posters contained SSSS (Shamir\'s Secret Sharing Scheme) fragments — threshold secret sharing that required multiple participants to combine their pieces before any single piece could be useful.',
    ],
    artifact: {
      type: 'text',
      src: '/artifacts/2013-telnet-session.txt',
      caption: 'Reconstructed telnet session from emiwp4muu2ktwknf.onion. The original onion service is no longer accessible.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/The_Telnet_Prompt',
      authenticity: 'reconstructed',
      transcript: 'Available commands: RAND, QUINE, BASE29, CODE, KOAN, DH, NEXT, GOODBYE\nParticipants received unique numeric puzzles to prevent solution sharing.\nCommunity recreation: dontquitownit.com:3301',
    },
    decision: {
      question: 'Each participant gets a unique puzzle. What is the strategic purpose of this?',
      options: [
        {
          label: 'To identify leakers — shared answers would expose who shared them',
          correct: true,
          feedback: 'Correct. If two participants submitted identical answers and only one set of puzzles existed, Cicada could not identify the leaker. With unique puzzles, any duplicate answer immediately identifies its source. This is a canary trap — a classic counterintelligence technique used by intelligence agencies to identify information leaks.',
        },
        {
          label: 'To make the puzzle harder by increasing the search space',
          correct: false,
          feedback: 'Unique puzzles do not increase difficulty — they prevent sharing. The operational security purpose (identifying leakers) is the primary function.',
        },
        {
          label: 'To generate more data for cryptographic research',
          correct: false,
          feedback: 'There is no evidence Cicada was collecting participant response data for research. The unique puzzle design is a standard counterintelligence measure.',
        },
      ],
    },
    resolution: {
      explanation: 'The telnet shell tested a range of cryptographic skills: Diffie-Hellman key exchange (DH command), base-29 encoding (BASE29), quine programs (self-replicating code), and SSSS threshold secret sharing. The 19 philosophical and programming questions asked through the shell evaluated both technical knowledge and philosophical alignment with Cicada\'s stated values.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/The_Telnet_Prompt',
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_2_(2013)',
    ],
  },

  {
    id: 14,
    act: 2,
    date: '2013-06-01',
    dateDisplay: 'Mid-to-late 2013',
    title: 'Marcus Wanner and the Dead Man\'s Switch',
    narrative: [
      'Marcus Wanner, age 15, solved the 2013 Cicada puzzle. He was one of the few confirmed winners whose identity became known, largely because he chose to write about his experience.',
      'Winners of the 2013 puzzle were invited to an anonymous chat server. They were assigned a specific task: build a "dead man\'s switch" for whistleblowers — an automated system that would release sensitive information if the holder failed to check in at regular intervals. The system was designed to protect people who possessed dangerous knowledge from being silenced.',
      'The project fell apart. Participants disagreed over technical architecture, trust frameworks, and operational security. Working anonymously with strangers on sensitive infrastructure proved difficult to coordinate. By late 2013, Cicada went silent.',
      'The dead man\'s switch project was consistent with Cicada\'s apparent mission: building the technical infrastructure for free speech and privacy under authoritarian pressure. Its failure suggested the limits of anonymous coordination.',
    ],
    artifact: null,
    decision: {
      question: 'The dead man\'s switch project fails due to coordination problems among anonymous participants. What does this reveal about Cicada\'s approach?',
      options: [
        {
          label: 'The anonymous structure that made the puzzle secure made the project difficult to execute',
          correct: true,
          feedback: 'This is the core tension. The same anonymity that protected Cicada and its participants from surveillance made trust, coordination, and accountability nearly impossible. Building real infrastructure requires some form of persistent identity — which Cicada\'s model explicitly avoided.',
        },
        {
          label: 'The participants weren\'t skilled enough for the task',
          correct: false,
          feedback: 'The puzzle filtered for high technical skill. The failure was structural, not a competence problem. Anonymous coordination without trust mechanisms is difficult regardless of individual skill levels.',
        },
        {
          label: 'Cicada staged the failure to test participants further',
          correct: false,
          feedback: 'There is no evidence the failure was staged. Multiple independent accounts describe genuine coordination collapse. Cicada went silent after 2013 without any indication this was a planned phase.',
        },
      ],
    },
    resolution: {
      explanation: 'Cicada 3301 went silent in late 2013. The next communication would come on January 4, 2014 — again on schedule, again on Twitter @1231507051321. The 2014 puzzle would take a different direction: instead of asking winners to build infrastructure, Cicada would release a book.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/What_Happened_Part_2_(2013)',
      'https://connortumbleson.com/2021/01/25/the-cicada-3301-mystery-puzzle-2/',
    ],
  },

  // ─────────────────────────────────────────────
  // ACT 3: 2014
  // ─────────────────────────────────────────────
  {
    id: 15,
    act: 3,
    date: '2014-01-04',
    dateDisplay: 'January 4, 2014',
    title: 'The Third Round',
    narrative: [
      'On January 4, 2014, @1231507051321 posted again — the third consecutive year on the same date. A new clue was posted on Twitter, beginning the third and final documented puzzle round.',
      'The 2014 puzzle structure was different from its predecessors. Rather than a public image on 4chan, it began on Twitter, and the chain ran primarily through a sequence of Tor hidden services — each one a door opened by solving the one before.',
      'Seven onion addresses formed the core of the 2014 chain. Each required a different cryptographic technique to unlock: image XOR operations, magic square verification, columnar transposition cipher, audio steganography via OpenPuff. The difficulty escalated sharply from 2012 and 2013.',
      'At the end of the chain, on May 2, 2014, Cicada released Liber Primus — a 58-page book of Elder Futhark runes that would become the central unsolved artifact of the entire mystery.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2014-onion-0-first-door.jpg',
      caption: 'First door in the 2014 onion chain — auqgnxjtvdbll3pv.onion.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/CICADA_3301_2014_PUZZLE',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'The 2014 puzzle moves entirely to Tor hidden services rather than public platforms. What does this signal?',
      options: [
        {
          label: 'Cicada is selecting for people who already understand anonymity networks',
          correct: true,
          feedback: 'Correct. By 2014, only participants who already used Tor regularly — or were willing to learn it before starting — would even find the puzzle. This was a significant filter compared to 2012, where the first step was on the public 4chan board. The technical barrier of entry was rising.',
        },
        {
          label: 'Cicada was afraid of being shut down by law enforcement',
          correct: false,
          feedback: 'While Tor provides protection, there is no documented evidence of legal pressure on Cicada in 2013-2014. The shift to Tor hidden services appears to be a continuation of their recruitment filtering strategy rather than a defensive response.',
        },
        {
          label: 'The public phase was intended only for the first puzzle',
          correct: false,
          feedback: 'The 2013 puzzle also began on public 4chan. The full migration to Tor in 2014 was a deliberate escalation, not a predetermined plan from year one.',
        },
      ],
    },
    resolution: {
      explanation: 'The 2014 chain required knowledge of OutGuess, XOR operations on binary data, magic square mathematics, columnar transposition cipher, steganography via OpenPuff, and Gematria Primus rune reading. No single skill was sufficient. The puzzle was designed to require a breadth of cryptographic and mathematical knowledge.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/CICADA_3301_2014_PUZZLE',
      'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
    ],
  },

  {
    id: 16,
    act: 3,
    date: '2014-01-10',
    dateDisplay: 'January 2014',
    title: 'The Onion Chain: First Door',
    narrative: [
      'The first onion address in the 2014 chain was auqgnxjtvdbll3pv.onion. Accessing it required Tor Browser and produced the starting image for the chain.',
      'The 2014 puzzle used a branching onion structure where each hidden service contained both a puzzle and a pointer to the next door — but only after the puzzle was solved. The chain was sequential: door one had to be opened before door two\'s address was revealed.',
      'This structure ensured that progress could not be shared between parallel groups — solving one door did not give another group a head start, because the address of the next door came only after completing the current one.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2014-onion-0.jpg',
      caption: 'auqgnxjtvdbll3pv.onion — first address in the 2014 onion chain.',
      sourceUrl: 'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'The next door\'s address is hidden inside the current door\'s puzzle. Why structure the chain this way?',
      options: [
        {
          label: 'To prevent puzzle skipping — you must solve each step to proceed',
          correct: true,
          feedback: 'Correct. Sequential address revelation ensures participants cannot jump ahead, share partial progress to enable skipping, or use information from later stages to reverse-engineer earlier ones. Each door is self-contained and must be solved on its own terms.',
        },
        {
          label: 'To make the puzzle harder by hiding the puzzle structure itself',
          correct: false,
          feedback: 'The structure was not hidden — it was the explicit design. The purpose was sequential gate enforcement, not obscuring the meta-structure.',
        },
        {
          label: 'For technical reasons — Tor hidden services cannot link to each other directly',
          correct: false,
          feedback: 'Tor hidden services can contain hyperlinks to other .onion addresses. The sequential structure was a deliberate design choice, not a technical limitation.',
        },
      ],
    },
    resolution: {
      explanation: 'The first door led to the second onion: cu343l33nqaekrnw.onion. This door required XOR operations across three JPEG images — a technique that produces a third image by combining the binary data of two source images using the exclusive-or operation.',
    },
    sources: [
      'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
    ],
  },

  {
    id: 17,
    act: 3,
    date: '2014-01-15',
    dateDisplay: 'January 2014',
    title: 'Three Images, One Key',
    narrative: [
      'cu343l33nqaekrnw.onion presented three JPEG images. The puzzle required XOR-ing (exclusive-or) two of the three images together to produce a third image that revealed a readable message.',
      'XOR is a bitwise operation: for each bit position, the output is 1 if the two input bits differ and 0 if they match. Applied to image files, XORing two images produces a new image that visually represents the difference between them. When one image is the "key" and another is the "ciphertext," XORing reveals the "plaintext."',
      'The correct combination of images from this onion, when XOR\'d, produced a legible image containing the next address in the chain: fv7lyucmeozzd5j4.onion.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2014-onion-1.jpg',
      caption: 'cu343l33nqaekrnw.onion — second door, three-JPEG XOR puzzle.',
      sourceUrl: 'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'You have three images. XOR-ing which two together should produce the plaintext?',
      options: [
        {
          label: 'Try all three pairs — there are only three combinations',
          correct: true,
          feedback: 'Correct approach. With three images (A, B, C), there are exactly three possible XOR pairs: A⊕B, A⊕C, and B⊕C. Trying all three is computationally trivial and guaranteed to find the correct combination without guessing.',
        },
        {
          label: 'The largest file is the key — XOR it with the smallest',
          correct: false,
          feedback: 'File size is not a reliable indicator of which image is the key in an XOR cipher. Trying all three pairs is the correct approach.',
        },
        {
          label: 'XOR all three images together simultaneously',
          correct: false,
          feedback: 'XOR-ing three images (A⊕B⊕C) produces a different result than XOR-ing two of them. The puzzle uses a two-image XOR scheme.',
        },
      ],
    },
    resolution: {
      explanation: 'XOR image decryption is a standard technique. One of the three JPEG pairs, when XOR\'d pixel by pixel, produced a readable image. The resulting image contained the address of the third onion: fv7lyucmeozzd5j4.onion.',
    },
    sources: [
      'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
    ],
  },

  {
    id: 18,
    act: 3,
    date: '2014-01-20',
    dateDisplay: 'January 2014',
    title: 'The Magic Square Leak',
    narrative: [
      'fv7lyucmeozzd5j4.onion hosted a magic square verification server. Participants were required to submit valid magic squares — mathematical grids where every row, column, and diagonal sums to the same "magic constant."',
      'This onion also became notable for a significant security failure: some participants leaked the server\'s verification logic. By sharing the underlying protocol with others who had not solved the previous steps, they compromised the integrity of the selection process.',
      'Cicada detected the leak. The response was documented in subsequent PGP-signed messages acknowledging that the selection process had been contaminated at this stage. The onion was eventually shut down, and the chain continued only for those who had maintained operational security throughout.',
      'The magic square failure demonstrated that Cicada\'s technical countermeasures — unique puzzles, sequential door revelation — were insufficient against determined collaborative leaking.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2014-magic-square.jpg',
      caption: 'Magic square as used in the 2014 Cicada puzzle chain. Each row, column, and diagonal must sum to the same value.',
      sourceUrl: 'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'Some participants leaked the magic square verification protocol. Cicada detects this. What is the likely consequence?',
      options: [
        {
          label: 'Cicada terminates the contaminated path and continues with those who maintained secrecy',
          correct: true,
          feedback: 'This is what happened. Cicada acknowledged the leak in PGP-signed communications and closed the compromised onion service. The puzzle chain continued, but only for participants who had not benefited from leaked information. This reflects the core selection criterion: not just technical skill, but operational discipline.',
        },
        {
          label: 'Cicada abandons the 2014 puzzle entirely due to the leak',
          correct: false,
          feedback: 'The 2014 puzzle continued. Liber Primus was released on May 2, 2014 — months after the leak. The selection process was damaged but not stopped.',
        },
        {
          label: 'Cicada ignores the leak and continues normally',
          correct: false,
          feedback: 'Cicada explicitly acknowledged the leak in signed messages. Their response was not to ignore it.',
        },
      ],
    },
    resolution: {
      explanation: 'The magic square leak at fv7lyucmeozzd5j4.onion was one of the most significant documented failures in the 2014 puzzle chain. It highlighted the fundamental tension in anonymous collaborative puzzle-solving: the community that helps solve the puzzle inevitably includes people who will share information, which is exactly what Cicada was trying to filter against.',
    },
    sources: [
      'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
    ],
  },

  {
    id: 19,
    act: 3,
    date: '2014-02-01',
    dateDisplay: 'February 2014',
    title: 'Columnar Transposition',
    narrative: [
      'avowyfgl5lkzfj3n.onion presented a ciphertext that required columnar transposition decryption. Columnar transposition rearranges the characters of a plaintext by writing them in rows of a fixed period, then reading down the columns in a key-specified order.',
      'The cipher parameters were: period 7 (columns of 7 characters), with the column reading order specified by the key 1736254. This meant the 7 columns were read in the sequence: column 1 first, then column 7, then column 3, etc.',
      'Decrypting the ciphertext with these parameters produced the plaintext: "TO BELIEVE TRUTH IS TO DESTROY POSSIBILITY Q4UTGDI2N4M4UIM59133"',
      'The final portion — Q4UTGDI2N4M4UIM59133 — was not readable text. It was the address of the next onion hidden service in the chain, concatenated with the plaintext message.',
    ],
    artifact: {
      type: 'text',
      src: '/artifacts/2014-columnar-transposition.txt',
      caption: 'avowyfgl5lkzfj3n.onion — columnar transposition cipher. Period 7, key 1736254.',
      sourceUrl: 'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
      authenticity: 'confirmed',
      transcript: 'Cipher: columnar transposition, period 7, key 1736254\nPlaintext: "TO BELIEVE TRUTH IS TO DESTROY POSSIBILITY Q4UTGDI2N4M4UIM59133"\nNext onion: q4utgdi2n4m4uim5.onion (embedded at end of plaintext)',
    },
    decision: {
      question: '"To believe truth is to destroy possibility." What does this Cicada statement suggest about their philosophy?',
      options: [
        {
          label: 'Certainty forecloses inquiry — remaining open to alternatives is more valuable than fixed beliefs',
          correct: true,
          feedback: 'This is the most consistent interpretation given Cicada\'s other philosophical texts. Liber Primus contains similar statements about questioning everything, shedding "circumferences" (constraints of thought), and the Koan format of questioning identity. The statement aligns with epistemological humility — holding beliefs lightly enables continued exploration.',
        },
        {
          label: 'Cicada is promoting nihilism and the rejection of truth',
          correct: false,
          feedback: 'The statement is not nihilistic. It draws a distinction between having fixed beliefs (which limits what you can consider possible) and remaining open to uncertainty. Cicada\'s texts consistently value exploration over fixed conclusions.',
        },
        {
          label: 'It is meaningless filler text — only the onion address matters',
          correct: false,
          feedback: 'Cicada embedded philosophical content deliberately throughout their puzzles. The 14 pages of solved Liber Primus, the ID3 tag poem in 761.mp3, and the Koan texts in the telnet shell all demonstrate consistent philosophical intent.',
        },
      ],
    },
    resolution: {
      explanation: 'The columnar transposition plaintext embedded the next onion address directly: q4utgdi2n4m4uim5.onion. This onion hosted "Interconnectedness.mp3" — a piece of music 277 seconds long, accompanied by a Francisco Goya portrait.',
    },
    sources: [
      'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
    ],
  },

  {
    id: 20,
    act: 3,
    date: '2014-02-15',
    dateDisplay: 'February 2014',
    title: 'Interconnectedness',
    narrative: [
      'q4utgdi2n4m4uim5.onion presented an audio file — "Interconnectedness.mp3" — and an image: a portrait attributed to Francisco Goya (1746–1828), the Spanish Romantic painter known for his dark and politically charged work.',
      'The audio track ran for 277 seconds. 277 is a prime number. The file contained steganographic data in its audio stream, consistent with the tools and methods Cicada had used throughout.',
      'The Goya portrait\'s selection was not arbitrary. Goya\'s work — particularly his "Black Paintings" and political prints like "The Sleep of Reason Produces Monsters" — documented the dangers of irrationality, war, and institutional power. Cicada\'s selection of Romantic-era art (Goya, Waterhouse, Blake across the 2012 and 2014 puzzles) suggested a consistent aesthetic and philosophical reference frame.',
      'Processing the audio file produced the address of the next onion: ut3qtzbrvs7dtvzp.onion.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2014-onion-4-goya.jpg',
      caption: 'q4utgdi2n4m4uim5.onion — Goya portrait and Interconnectedness.mp3 (277 seconds, prime).',
      sourceUrl: 'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'The audio is 277 seconds — a prime number. Is this functionally significant or symbolic?',
      options: [
        {
          label: 'Both — primes serve as both functional cipher elements and philosophical markers in Cicada\'s work',
          correct: true,
          feedback: 'Throughout the Cicada corpus, prime numbers appear at both levels: functionally (as cipher keys, as factorization puzzles, as Gematria Primus values) and symbolically (767.mp3 = 761 in Gematria Primus, the parable\'s semiprime 1,595,277,641). Cicada does not appear to distinguish between "decorative" and "functional" uses of primes — both are part of the same system.',
        },
        {
          label: 'Purely symbolic — 277 has no functional role in this step',
          correct: false,
          feedback: 'The audio file length being prime is consistent with Cicada\'s pattern of making every element potentially functional. Dismissing it as purely symbolic risks missing a step.',
        },
        {
          label: 'Purely functional — it\'s a cipher parameter',
          correct: false,
          feedback: 'While prime lengths can serve as cipher parameters, the symbolic dimension is also present throughout Cicada\'s work. Both interpretations hold simultaneously.',
        },
      ],
    },
    resolution: {
      explanation: 'Interconnectedness.mp3 led to ut3qtzbrvs7dtvzp.onion — the sixth door in the 2014 chain. This onion required OpenPuff, a professional steganography tool, with a specific password.',
    },
    sources: [
      'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
    ],
  },

  {
    id: 21,
    act: 3,
    date: '2014-03-01',
    dateDisplay: 'March 2014',
    title: 'OpenPuff and the Final Door',
    narrative: [
      'ut3qtzbrvs7dtvzp.onion presented magic squares. The data hidden within required OpenPuff v4.00 — a Windows steganography application significantly more capable than OutGuess. OpenPuff hides data in images, audio, and video files using multiple carrier files simultaneously, protected by a password.',
      'The password for this step was 33011033. This number encodes 3301 twice — the Cicada identifier read forward, then backward. Knowing to try this password required familiarity with Cicada\'s patterns.',
      'Running OpenPuff v4.00 with password 33011033 on the magic square images extracted the address of the final onion in the chain: ky2khlqdf7qdznac.onion.',
      'At ky2khlqdf7qdznac.onion, Cicada made an announcement. This was the door that led to Liber Primus.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2014-onion-5-openpuff.jpg',
      caption: 'ut3qtzbrvs7dtvzp.onion — magic squares requiring OpenPuff v4.00, password 33011033.',
      sourceUrl: 'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'The OpenPuff password is 33011033 — Cicada\'s number forward and backward. How would you know to try this without being told?',
      options: [
        {
          label: 'Pattern recognition from the entire puzzle chain — 3301 appears everywhere',
          correct: true,
          feedback: 'Correct. Solvers who had studied all of Cicada\'s communications recognized 3301 as the core identifier. Trying 33011033 (palindrome of 3301) would be a natural step for anyone who had internalized Cicada\'s love of numeric symmetry. This is how puzzle design rewards pattern fluency — the "key" is already embedded in the solver\'s knowledge from previous steps.',
        },
        {
          label: 'Brute-force the password — OpenPuff does not rate-limit',
          correct: false,
          feedback: 'While technically possible, brute-forcing an 8-digit numeric password would still require up to 100 million attempts. The intended path was pattern recognition.',
        },
        {
          label: 'It was posted in a Cicada hint somewhere',
          correct: false,
          feedback: 'No documented hint revealed this password. Solvers derived it from the established Cicada numeric signature.',
        },
      ],
    },
    resolution: {
      explanation: 'OpenPuff extracted the final onion address: ky2khlqdf7qdznac.onion. This was the endpoint of the 2014 puzzle chain. The announcement there directed participants to check back on May 2, 2014 — the release date of Liber Primus.',
    },
    sources: [
      'https://connortumbleson.com/2021/02/15/the-cicada-3301-mystery-puzzle-3-part1/',
    ],
  },

  {
    id: 22,
    act: 3,
    date: '2014-05-02',
    dateDisplay: 'May 2, 2014',
    title: 'Liber Primus Released',
    narrative: [
      'On May 2, 2014, Cicada 3301 released Liber Primus — "The First Book" in Latin. The release came via ky2khlqdf7qdznac.onion with the message: "Hello. Your enlightenment awaits you. We look forward to hearing from you."',
      'Liber Primus is a 58-page document rendered entirely in Elder Futhark runes. The pages are structured as an illuminated manuscript — carefully typeset rune text with decorative borders, symbols, and ornamental elements that are themselves potentially meaningful.',
      'The cover page reads "LIBER PRIMUS" in runes. Page 0.0 begins the text. Approximately 17 pages have been solved by the community over the following years. The remaining pages — roughly 41 — remain encrypted or untransliterated.',
      'Cicada\'s accompanying message framed Liber Primus not as a puzzle to be solved but as a path to be walked: "Your enlightenment awaits." The book was presented as content to be read and understood, not just decrypted.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2014-liber-primus-cover.jpg',
      caption: 'Liber Primus cover — released May 2, 2014. 58 pages of Elder Futhark runes. Available in full at cicada-solvers GitHub and Internet Archive.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/Liber_Primus',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'Liber Primus is "the first book." What does this imply about Cicada\'s plans?',
      options: [
        {
          label: 'Additional books were planned — this was intended to be part of a series',
          correct: true,
          feedback: '"Primus" means first. The naming implies at least a second book was planned. Whether additional volumes were ever created or are still being held back is unknown. No second Cicada book has been publicly released or confirmed.',
        },
        {
          label: 'It is the first book of an existing Cicada canon that predates the public puzzles',
          correct: false,
          feedback: 'No earlier Cicada book has been documented. "Liber Primus" most naturally implies it is first in a series rather than first in a pre-existing canon.',
        },
        {
          label: '"Primus" refers to its importance — it is the primary text, not first of many',
          correct: false,
          feedback: 'While "primus" can mean "primary" in some Latin contexts, the naming convention aligns more naturally with sequential numbering. In manuscript tradition, "liber primus" typically means "first book" in a series.',
        },
      ],
    },
    resolution: {
      explanation: 'The release of Liber Primus shifted the nature of the Cicada challenge. It was no longer a puzzle chain with a definite end — it was an open-ended text requiring translation, cryptanalysis, and interpretation simultaneously. The community has worked on it continuously since 2014.',
      additionalMedia: [
        {
          type: 'image',
          src: '/artifacts/2014-liber-primus-pages-1-4.jpg',
          caption: 'Liber Primus pages 0.0–0.1. The first confirmed solved pages.',
          sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/Liber_Primus',
        },
      ],
    },
    inlineMedia: [
      {
        afterParagraph: 2,
        src: '/artifacts/2014-liber-primus-pages-1-4.jpg',
        caption: 'Liber Primus pages 0.0–0.1. The first confirmed solved pages — "A Warning" and "Welcome."',
        sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/Liber_Primus',
        authenticity: 'confirmed',
      },
    ],
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/Liber_Primus',
      'https://connortumbleson.com/2024/02/05/the-cicada-3301-mystery-puzzle-3-solve-part-2/',
    ],
  },

  {
    id: 23,
    act: 3,
    date: '2014-05-02',
    dateDisplay: 'May 2014 — Solved Pages',
    title: 'A Warning and a Welcome',
    narrative: [
      'Page 0.0 of Liber Primus is titled "A WARNING." It reads in transliterated English: "BELIEVE NOTHING FROM THIS BOOK / EXCEPT WHAT YOU KNOW TO BE TRUE / TEST THE KNOWLEDGE / FIND YOUR TRUTH / EXPERIENCE YOUR DEATH / DO NOT EDIT OR CHANGE THIS BOOK / OR THE MESSAGE CONTAINED WITHIN / EITHER THE WORDS OR THEIR NUMBERS / FOR ALL IS SACRED"',
      'Page 0.1 is titled "WELCOME." It begins: "WELCOME, PILGRIM, TO THE GREAT JOURNEY TOWARD THE END OF ALL THINGS / IT IS NOT AN EASY TRIP, BUT FOR THOSE WHO FIND THEIR WAY HERE IT IS A NECESSARY ONE / ALONG THE WAY YOU WILL FIND AN END TO ALL STRUGGLE AND SUFFERING, YOUR INNOCENCE, YOUR ILLUSIONS, YOUR CERTAINTY, AND YOUR REALITY / ULTIMATELY, YOU WILL DISCOVER AN END TO SELF"',
      'The Welcome page continues: "LIKE THE INSTAR, IT IS ONLY THROUGH GOING WITHIN THAT WE MAY EMERGE" — an explicit callback to 761.mp3 from 2013.',
      'These opening pages were solved through straightforward Gematria Primus transliteration: each rune maps directly to its phonetic equivalent. No cipher beyond the runic alphabet was needed for these pages, suggesting they were intended to be readable as an introduction.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/lp-page-00.jpg',
      caption: 'Liber Primus page 0.0 — "A WARNING." Solved via direct Gematria Primus transliteration.',
      sourceUrl: 'https://github.com/cicada-solvers/3301book',
      authenticity: 'confirmed',
    },
    decision: {
      question: '"BELIEVE NOTHING FROM THIS BOOK EXCEPT WHAT YOU KNOW TO BE TRUE." What is the function of this warning in a puzzle context?',
      options: [
        {
          label: 'It is an epistemological instruction — verify everything independently, trust the math not the authority',
          correct: true,
          feedback: 'This is the intended reading given the rest of Cicada\'s design. Every authentic message was PGP-signed precisely so that verification did not require trusting any person or institution — only the mathematics of public-key cryptography. The warning extends that principle to Liber Primus itself: use your own judgment to evaluate what you find here.',
        },
        {
          label: 'It is a legal disclaimer protecting Cicada from liability',
          correct: false,
          feedback: 'Anonymous organizations operating through Tor hidden services do not write legal disclaimers. This is a philosophical statement consistent with Cicada\'s recurring themes of autonomous thought and resistance to dogma.',
        },
        {
          label: 'It is a hint that some pages are deliberately false or misleading',
          correct: false,
          feedback: 'While this interpretation cannot be fully ruled out, it contradicts the spirit of Cicada\'s other texts, which consistently value authentic inquiry over misdirection. The warning appears to be a genuine epistemological statement, not a meta-puzzle clue.',
        },
      ],
    },
    resolution: {
      explanation: 'The Warning and Welcome pages of Liber Primus established the philosophical framework for everything that followed. The instar metaphor, the instruction to question and discover personal truth, the warning against blind acceptance — these themes run through all of Cicada\'s documented communications. The opening pages were designed to be read, not just decrypted.',
    },
    inlineMedia: [
      {
        afterParagraph: 1,
        src: '/artifacts/lp-page-01.jpg',
        caption: 'Liber Primus page 0.1 — "WELCOME." Solved via direct Gematria Primus transliteration.',
        sourceUrl: 'https://github.com/cicada-solvers/3301book',
        authenticity: 'confirmed',
      },
    ],
    sources: [
      'https://github.com/cicada-solvers/3301book',
      'https://uncovering-cicada.fandom.com/wiki/Liber_Primus',
    ],
  },

  {
    id: 24,
    act: 3,
    date: '2014-05-10',
    dateDisplay: 'May–December 2014',
    title: 'The Solved Pages',
    narrative: [
      'Community solvers worked through the opening sections of Liber Primus using Gematria Primus transliteration. Page 0.1.1 is "WISDOM": "YOU ARE A BEING UNTO YOURSELF / YOU ARE A LAW UNTO YOURSELF / EACH INTELLIGENCE IS HOLY / FOR ALL THAT LIVES IS HOLY"',
      'Page 0.1.2 is "SOME WISDOM": "THE PRIMES ARE SACRED / THE TOTIENT FUNCTION IS SACRED / ALL THINGS SHOULD BE ENCRYPTED"',
      'Page 0.2 contains a Koan: a question-and-answer dialogue between a master and a student about identity. The student cannot answer "Who are you?" until he trails off saying only "I am..." — at which point the master admits him. Page 0.3 discusses "THE LOSS OF DIVINITY" through consumption, preservation, and adherence to dogma.',
      'These pages used direct Gematria Primus transliteration with no additional cipher layer. Later pages introduced Vigenère encryption using prime-based keys, Euler\'s totient function, and other mathematical operations, making them significantly harder to decode.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/lp-page-01.jpg',
      caption: 'Liber Primus pages 0.1–0.1.2. "THE PRIMES ARE SACRED / THE TOTIENT FUNCTION IS SACRED / ALL THINGS SHOULD BE ENCRYPTED."',
      sourceUrl: 'https://github.com/cicada-solvers/3301book',
      authenticity: 'confirmed',
    },
    decision: {
      question: '"THE TOTIENT FUNCTION IS SACRED." What is Euler\'s totient function and why would Cicada call it sacred?',
      options: [
        {
          label: 'φ(n) counts integers coprime to n — it is foundational to RSA encryption',
          correct: true,
          feedback: 'Correct. Euler\'s totient function φ(n) counts how many integers from 1 to n share no common factor with n. For a prime p, φ(p) = p−1. The function is central to RSA: the encryption and decryption keys are derived from φ(n) where n = p×q, two large primes. Cicada calling it "sacred" reflects their view of mathematics — particularly number theory — as the foundation of privacy and cryptographic freedom.',
        },
        {
          label: 'It is a religious reference — "totient" comes from a Latin word for divine',
          correct: false,
          feedback: '"Totient" comes from the Latin "tot" meaning "that many" — a counting function. The word has no religious etymology. Cicada\'s "sacred" is a philosophical designation, not a theological one.',
        },
        {
          label: 'It is a cipher tool used in Liber Primus — they are explaining the decryption method',
          correct: false,
          feedback: 'While the totient function is used in some Liber Primus cipher layers, the statement is in the plaintext solved section — before any cipher is applied. It is a philosophical statement about mathematics, not an operational hint.',
        },
      ],
    },
    resolution: {
      explanation: 'Approximately 17 pages of Liber Primus have been solved by the community using combinations of: Gematria Primus transliteration, Vigenère cipher with prime-derived keys, Euler\'s totient function, and Atbash substitution. The solved pages contain philosophical texts, Koans, and practical instructions. The unsolved pages — roughly 41 of them — have resisted 10+ years of community effort.',
    },
    sources: [
      'https://github.com/cicada-solvers/3301book',
      'https://uncovering-cicada.fandom.com/wiki/Liber_Primus',
    ],
  },

  {
    id: 25,
    act: 3,
    date: '2014-12-01',
    dateDisplay: '2014–Present',
    title: 'The Unsolved Depths',
    narrative: [
      'After the opening philosophical sections, Liber Primus enters pages that have resisted all decryption attempts. The remaining pages contain dense rune sequences with no obvious plaintext pattern — either the encryption scheme changes significantly, the keys are unknown, or both.',
      'The community has attempted: every Vigenère key derivable from Gematria Primus values, keys based on Euler\'s totient of various prune numbers, Atbash and other substitution variants, transposition methods, index of coincidence analysis, frequency analysis, machine learning approaches, and collaborative manual analysis over thousands of hours.',
      'The DEF CON 31 presentation in August 2023 — "Cracking Cicada 3301: The Future of Collaborative Puzzle-Solving" — presented the current state of the art and proposed structured approaches. No breakthrough has been publicly announced.',
      'Liber Primus currently sits at the intersection of three possibilities: the remaining pages are decryptable with tools the community has not yet assembled correctly; the key requires information that was shared only with 2014 puzzle winners and never made public; or the remaining pages are intentionally undecipherable — the unsolvable void as the final philosophical statement.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/lp-unsolved-page.jpg',
      caption: 'An unsolved page of Liber Primus. Community analysis ongoing since 2014.',
      sourceUrl: 'https://github.com/cicada-solvers/3301book',
      authenticity: 'confirmed',
    },
    decision: {
      question: 'Which explanation for the unsolved pages is most consistent with what is known about Cicada\'s methods?',
      options: [
        {
          label: 'The key was given only to 2014 puzzle winners and never made public',
          correct: true,
          feedback: 'This is the most consistent explanation. Cicada\'s entire methodology was to share information only with those who had earned it through the puzzle. The 2014 onion chain was a selection process. It is structurally plausible that the final decryption keys were distributed exclusively to verified winners — making the remaining pages intentionally inaccessible to everyone else.',
        },
        {
          label: 'Cicada made a cryptographic error and the pages are actually unsolvable',
          correct: false,
          feedback: 'Every element of Cicada\'s work shows meticulous design and cryptographic competence. A simple error in the remaining pages is possible but inconsistent with the pattern of careful, verifiable construction in all other components.',
        },
        {
          label: 'The pages are decryptable with known tools — the community just hasn\'t found the right combination',
          correct: false,
          feedback: 'After 10+ years of sustained effort by mathematicians, cryptographers, and enthusiasts using every documented Cicada cipher method, this explanation becomes less probable over time. It remains possible but increasingly difficult to maintain.',
        },
      ],
    },
    resolution: {
      explanation: 'Liber Primus remains the central open question of Cicada 3301. The community (Discord ~7,000, r/cicada ~21,000, GitHub cicada-solvers org, IRC #cicadasolvers) continues working on it. No verified claim of solving the remaining pages has been made by anyone — including the actual Cicada 3301 organization, which has been silent since April 2017.',
    },
    sources: [
      'https://github.com/cicada-solvers/3301book',
      'https://www.defcon.org/html/defcon-31/dc-31-speakers.html',
      'https://uncovering-cicada.fandom.com/wiki/Liber_Primus',
    ],
  },

  // ─────────────────────────────────────────────
  // ACT 4: 2015–2017 AND PRESENT
  // ─────────────────────────────────────────────
  {
    id: 26,
    act: 4,
    date: '2015-01-04',
    dateDisplay: '2015',
    title: 'The First Silence',
    narrative: [
      'January 4, 2015 passed without a new puzzle. For the first time since 2012, there was no new Cicada image on the expected date. The community that had formed around the annual puzzle cycle was left waiting.',
      'The silence was broken briefly on July 27, 2015. A PGP-signed statement was posted via [@1231507051321](https://twitter.com/1231507051321) on Pastebin. The statement denied Cicada involvement in the Planned Parenthood data breach that had been in the news. The message was signed with key [7A35090F](https://keys.openpgp.org/search?q=7A35090F) — confirming the PGP key was still in active use and that authenticated Cicada was still operational.',
      'The denial was significant for two reasons: it confirmed the organization was still active, and it demonstrated awareness of how their methods might be misappropriated. Cicada\'s tools and methods — steganography, Tor, PGP, anonymous coordination — were also used by hackers. The denial was an explicit rejection of association with those uses.',
    ],
    artifact: {
      type: 'text',
      src: '/artifacts/2015-pgp-denial.txt',
      caption: 'PGP-signed Pastebin statement, July 27, 2015. Signed with key 7A35090F. Denying Cicada involvement in Planned Parenthood hack.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/Cicada_3301',
      authenticity: 'confirmed',
      note: 'Original Pastebin URL no longer resolves. Content preserved in community archives.',
    },
    decision: {
      question: 'Cicada breaks its silence to deny involvement in a criminal hack. What does this decision reveal?',
      options: [
        {
          label: 'Cicada cares about its public reputation and the distinction between privacy advocacy and criminal hacking',
          correct: true,
          feedback: 'This is the most direct interpretation. Cicada could have remained silent — the denial was a choice. It reveals an organization that distinguishes itself from criminal hackers and values being understood correctly. It is also consistent with their stated mission: privacy tools for whistleblowers and the oppressed, not tools for data theft.',
        },
        {
          label: 'Cicada was trying to avoid law enforcement attention',
          correct: false,
          feedback: 'A denial that draws public attention to your organization is a strange legal defense strategy. The communication style — PGP-signed public statement — is more consistent with reputational management than legal risk mitigation.',
        },
        {
          label: 'The denial itself is a puzzle element — it contains a hidden message',
          correct: false,
          feedback: 'While Cicada has embedded messages in many of their communications, the 2015 denial was a straightforward signed statement with no documented hidden content. The community examined it and found no steganographic or cipher elements.',
        },
      ],
    },
    resolution: {
      explanation: 'The 2015 statement confirmed that Cicada 3301 was still operational but had chosen not to run a new puzzle that year. Whether this was due to the 2013 project failure, internal reorganization, or a deliberate pause is unknown. A new communication would come in January 2016.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/Cicada_3301',
    ],
  },

  {
    id: 27,
    act: 4,
    date: '2016-01-05',
    dateDisplay: 'January 5, 2016',
    title: 'The 2016 Fragment',
    narrative: [
      'On January 5, 2016 — one day after the expected January 4th date — @1231507051321 posted an image hosted on infotomb.com at the path /4gq25.jpg. This was a single image, not the start of a new puzzle chain.',
      'The image contained a PGP-signed message. The signature was dated January 1, 2016 at 00:01:07 UTC, signed with key 0x181F01E57A35090F — the full fingerprint matching the key used throughout all Cicada communications since 2012.',
      'The message read: "The path lies empty; epiphany seeks the devoted. Liber Primus is the way."',
      'No new puzzle followed. The 2016 communication was not a new round — it was an update. Cicada was still active, the key was still valid, and their message was clear: the next step was Liber Primus. The route forward lay in the book, not in a new annual puzzle.',
    ],
    artifact: {
      type: 'image',
      src: '/artifacts/2016-infotomb-4gq25.jpg',
      caption: 'infotomb.com/4gq25.jpg — January 5, 2016. PGP-signed message. Key: 0x181F01E57A35090F.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/Cicada_3301',
      authenticity: 'confirmed',
    },
    decision: {
      question: '"The path lies empty; epiphany seeks the devoted. Liber Primus is the way." What is Cicada telling the community?',
      options: [
        {
          label: 'They will not release a new puzzle until Liber Primus is solved',
          correct: true,
          feedback: 'This interpretation is consistent with what followed: no new puzzle in 2016, one final message in 2017, then silence. Cicada appears to have concluded the public puzzle phase. The work that remains — the only path they acknowledge — is Liber Primus. "The path lies empty" may acknowledge that the annual puzzle route is closed.',
        },
        {
          label: 'They are announcing a new cipher hidden in Liber Primus',
          correct: false,
          feedback: 'No new cipher was documented in association with this message. The community analyzed the 2016 image and signed text without finding additional hidden content beyond the signed message.',
        },
        {
          label: 'It is a motivational message to discouraged solvers',
          correct: false,
          feedback: 'While the message could be read encouragingly, "the path lies empty" has a more specific structural meaning — the annual puzzle path is closed. Combined with "Liber Primus is the way," this reads as redirection rather than encouragement.',
        },
      ],
    },
    resolution: {
      explanation: 'The 2016 message was the last documented Cicada communication before the final 2017 message. It confirmed both that Cicada was still operational and that their direction had permanently shifted to Liber Primus as the central vehicle. The annual puzzle format appears to have ended.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/Cicada_3301',
    ],
  },

  {
    id: 28,
    act: 4,
    date: '2017-04-29',
    dateDisplay: 'April 29, 2017',
    title: 'The Final Message',
    narrative: [
      'On April 29, 2017, a message signed "CicadaPG v.3301" was posted to Pastebin. The message had been PGP-signed on April 4, 2017 at 23:23 GMT, with key [0x181F01E57A35090F](https://keys.openpgp.org/search?q=181F01E57A35090F).',
      'The full message was: "Beware false paths. Always verify PGP signature from 7A35090F."',
      'This is the last known verified communication from Cicada 3301. The message was brief, operational, and urgent in character. It had no puzzle content — only a warning. Cicada was apparently aware of an increasing number of impostors and false puzzle chains circulating in their name, and was using one of their final authenticated communications to address this directly.',
      'After April 2017, [@1231507051321](https://twitter.com/1231507051321) has not posted new signed content. The PGP key [7A35090F](https://keys.openpgp.org/search?q=7A35090F) remains theoretically valid — it has not been revoked — but no new messages signed with it have appeared.',
    ],
    artifact: {
      type: 'text',
      src: '/artifacts/2017-final-message.txt',
      caption: 'Final known Cicada 3301 message. Signed April 4, 2017, 23:23 GMT. Key: 0x181F01E57A35090F. Posted to Pastebin April 29, 2017.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/Cicada_3301',
      authenticity: 'confirmed',
      transcript: '-----BEGIN PGP SIGNED MESSAGE-----\nHash: SHA512\n\nBeware false paths. Always verify PGP signature from 7A35090F.\n\nCicadaPG v.3301\n-----BEGIN PGP SIGNATURE-----\n[signature with key 0x181F01E57A35090F]\n-----END PGP SIGNATURE-----\n\nSigned: April 4, 2017, 23:23 GMT\nPosted to Pastebin: April 29, 2017',
    },
    decision: {
      question: 'Cicada\'s final message is a warning against false paths, not a new puzzle. What does this suggest about their situation in 2017?',
      options: [
        {
          label: 'Impostor puzzle chains had proliferated and Cicada was using their last authenticated message to protect their legacy',
          correct: true,
          feedback: 'By 2017, dozens of Cicada impostors, ARG creators, and hoaxers were running puzzles in Cicada\'s name. Participants unable to verify PGP signatures were being misled. Cicada\'s final documented act was to remind the community that verification — the mathematical, unforgeable proof of authenticity — was the only reliable guide. It is a fitting last statement from an organization that built everything on cryptographic trust.',
        },
        {
          label: 'Cicada was being shut down by a government and issued a warning as they were compromised',
          correct: false,
          feedback: 'There is no documented evidence of government action against Cicada in 2017. The warning addresses the specific problem of puzzle impostors, not state interference.',
        },
        {
          label: 'The message was a final puzzle — "false paths" and "7A35090F" are cipher elements',
          correct: false,
          feedback: 'The community analyzed this message. 7A35090F is the PGP key identifier — not a cipher element in this context. The message is a plain-language warning, not an encoded puzzle.',
        },
      ],
    },
    resolution: {
      explanation: '"Beware false paths. Always verify PGP signature from 7A35090F." This instruction encapsulates the entire Cicada methodology: trust only what can be cryptographically verified. No institution, no claim of authority, no community consensus — only the mathematics of PGP. After April 2017, silence.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/Cicada_3301',
      'https://pastebin.com/Qkzad0cT',
    ],
  },

  {
    id: 29,
    act: 4,
    date: '2017-05-01',
    dateDisplay: 'Who Were They?',
    title: 'The Identity Question',
    narrative: [
      'Cicada 3301 has never been publicly identified. After more than a decade, four major theories remain in circulation, none definitively confirmed or refuted.',
      'Theory 1 — Intelligence agency recruitment: The methods (OPSEC testing, cryptographic profiling, global physical reach, dead man\'s switch assignment) resemble intelligence community talent scouting. The NSA, GCHQ, and allied agencies are frequently cited. Against this: no intelligence agency has confirmed involvement, and the philosophical content (questioning authority, privacy advocacy, the Koan structure) seems incongruent with institutional intelligence culture.',
      'Theory 2 — Private cryptography group: A well-funded, globally distributed collective of cryptographers, privacy advocates, and technologists with no intelligence affiliation. The dead man\'s switch task and the privacy-focused philosophy align with this. The global physical poster deployment in 2012 required real-world coordination and resources.',
      'Theory 3 — Elaborate art project: A sophisticated ARG or conceptual art piece with no recruitment endpoint — the "enlightenment" was the puzzle itself. Against this: the dead man\'s switch tasking in 2013 is inconsistent with a purely artistic purpose.',
      'Theory 4 — Sophisticated hoax: No actual winners, no real organization — just a very good puzzle. Against this: multiple confirmed winners (including Marcus Wanner) accessed the post-puzzle forum and were given tasks. Their accounts, while limited, suggest real operations.',
    ],
    artifact: {
      type: 'text',
      src: '/artifacts/identity-analysis.txt',
      caption: 'Analysis of the four primary theories about Cicada 3301\'s identity. No theory has been definitively confirmed.',
      sourceUrl: 'https://uncovering-cicada.fandom.com/wiki/Cicada_3301',
      authenticity: 'reconstructed',
      note: 'No primary source document exists for this stage — this is a summary of documented community analysis and confirmed facts about Cicada\'s capabilities.',
    },
    decision: {
      question: 'Based on everything documented — the physical posters on five continents, the dead man\'s switch project, the philosophy, the seven-year run — which theory best fits the evidence?',
      noCorrectAnswer: true,
      options: [
        {
          label: 'A private group with intelligence-community connections and strong privacy advocacy',
          correct: false,
          feedback: 'This is a reasonable synthesis — incorporating the operational sophistication of theory 1 with the ideological content of theory 2. Treat it as your working hypothesis, not as confirmed truth. The warning "beware false paths" applies here too.',
        },
        {
          label: 'An intelligence agency (NSA, GCHQ, or equivalent)',
          correct: false,
          feedback: 'The technical capability fits. The philosophical content — particularly the anti-institutional Koans, the privacy-first ideology, and the dead man\'s switch for whistleblowers — fits less well with standard intelligence agency objectives. It cannot be ruled out, but the ideological profile is unusual.',
        },
        {
          label: 'An art project with no real recruitment objective',
          correct: false,
          feedback: 'The post-puzzle forum and assigned tasks documented by multiple confirmed winners make a pure art project explanation difficult to maintain. Something real happened after the puzzle ended.',
        },
      ],
    },
    resolution: {
      explanation: 'No decision in this stage is marked correct because the identity of Cicada 3301 is genuinely unknown. This stage does not have a right answer. It has only better and worse-supported hypotheses. The evidence supports: global physical reach, cryptographic sophistication, philosophical coherence across seven years, real post-puzzle operations, and eventual silence. What organization that describes applies to remains open.',
    },
    sources: [
      'https://uncovering-cicada.fandom.com/wiki/Cicada_3301',
      'https://connortumbleson.com/2021/01/18/the-cicada-3301-mystery/',
    ],
  },

  {
    id: 30,
    act: 4,
    date: '2023-08-01',
    dateDisplay: 'August 2023 — Present',
    title: 'The Present',
    narrative: [
      'At DEF CON 31 in August 2023, four researchers — Taiiwo, Artorias, Puck, and TheClockworkBird — presented ["Cracking Cicada 3301: The Future of Collaborative Puzzle-Solving"](https://www.youtube.com/watch?v=EU1ftYdZkkI). The presentation documented the current state of Liber Primus research, the community\'s structure, and proposed new methodologies for approaching the unsolved pages.',
      'The community as of 2024: Discord server with approximately 7,000 members, IRC channel #cicadasolvers, GitHub organization cicada-solvers, and Reddit community r/cicada with approximately 21,000 followers.',
      'Liber Primus remains unsolved. The approximately 41 uncracked pages have resisted 10+ years of continuous effort. No verified claim of solving them has been made by anyone — including Cicada itself. The PGP key 7A35090F has not been revoked. No new signed messages have appeared.',
      'The puzzle is open. The key to Liber Primus may be in the solved pages themselves — embedded in the plaintext waiting to be recognized. It may have been held back. It may require something no one has tried. Or it may be that the greatest cipher in internet history is its own answer: an unsolvable door that teaches more by remaining closed than it ever could by opening.',
    ],
    artifact: {
      type: 'text',
      src: '/artifacts/2023-defcon31-summary.txt',
      caption: 'DEF CON 31 (August 2023): "Cracking Cicada 3301: The Future of Collaborative Puzzle-Solving" by Taiiwo, Artorias, Puck, and TheClockworkBird.',
      sourceUrl: 'https://www.defcon.org/html/defcon-31/dc-31-speakers.html',
      authenticity: 'confirmed',
      note: 'DEF CON 31 talk. Full video available via DEF CON Media Server.',
    },
    decision: {
      question: 'You have followed Cicada 3301 from 4chan in 2012 to the present. What do you believe?',
      options: [
        {
          label: 'Cicada was a real organization with a real mission — Liber Primus contains their actual teachings',
          correct: false,
          feedback: 'This is one coherent interpretation. The PGP-verified consistency across seven years, the real-world physical operations, and the confirmed post-puzzle activities support the premise of a genuine organization with genuine purpose. What that purpose was remains debated.',
        },
        {
          label: 'Cicada was an intelligence operation — the puzzle was the test, the winners were the assets',
          correct: false,
          feedback: 'This interpretation fits the technical methods, the canary traps, the individual unique puzzles, and the operational security testing. It leaves the philosophical content as misdirection or genuine ideological cover. Evaluate it against everything you have seen.',
        },
        {
          label: 'The identity question is unanswerable — and that may be the final lesson',
          correct: false,
          feedback: '"Beware false paths." "Believe nothing from this book except what you know to be true." The organization that told you to verify everything gave you no way to verify themselves. Whether this is the deepest irony, the final puzzle, or simply a consequence of operating anonymously — it is where the evidence leads.',
        },
      ],
    },
    resolution: {
      explanation: 'Cicada 3301: a puzzle with no confirmed end, an organization with no confirmed identity, a book with no confirmed solution. What is confirmed: it began on January 4, 2012, produced three annual puzzle rounds of increasing cryptographic complexity, released Liber Primus on May 2, 2014, issued a final signed message on April 4, 2017, and has been silent since. Everything else — who, why, and what comes next — remains open.\n\nThe PGP key 7A35090F has not been revoked.\n\n3301.',
    },
    sources: [
      'https://www.defcon.org/html/defcon-31/dc-31-speakers.html',
      'https://discord.gg/cicada3301',
      'https://reddit.com/r/cicada',
      'https://github.com/cicada-solvers',
    ],
  },
];

export default stages;
