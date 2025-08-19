import { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";

interface HappinessInsights {
  faith: string;
  family: string;
  work: string;
  service: string;
}

interface ReportData {
  sign: string;
  overview: string;
  happiness: HappinessInsights;
}

// Compute the sun sign based on the month and day
function calculateZodiacSign(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1;

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "Capricorn";
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  return "Pisces";
}

// A lookup table containing a brief overview and happiness suggestions for each sign
const signMeanings: Record<string, ReportData> = {
  Aries: {
    sign: "Aries",
    overview:
      "Bold and energetic, Aries thrive on new challenges and spontaneous adventure. Your fiery nature makes you a natural leader who takes initiative with enthusiasm.",
    happiness: {
      faith:
        "Anchor your fiery energy with mindfulness practices like meditation or yoga. Cultivate patience and reflection to bring meaning to your pursuits.",
      family:
        "Invest quality time with loved ones. Your enthusiasm is contagious—use it to inspire deep connections rather than rushing ahead.",
      work:
        "Channel your initiative into collaborative projects that serve a greater purpose. Balance ambition with cooperation.",
      service:
        "Volunteer or mentor where your leadership skills can shine. Leading others toward a common goal will bring fulfillment.",
    },
  },
  Taurus: {
    sign: "Taurus",
    overview:
      "Grounded and reliable, Taurus values stability, comfort, and sensual pleasure. You are patient and persistent, with a strong appreciation for beauty.",
    happiness: {
      faith:
        "Cultivate gratitude by savoring life’s simple pleasures. Mindful appreciation of nature and art can deepen your sense of purpose.",
      family:
        "Nurture relationships by sharing your calm presence. Offer support and loyalty, and allow others to see your softer side.",
      work:
        "Engage in work that appeals to your sense of quality and craftsmanship. Create environments where beauty and practicality coexist.",
      service:
        "Provide tangible assistance—cooking a meal or creating something beautiful for others will nourish your heart.",
    },
  },
  Gemini: {
    sign: "Gemini",
    overview:
      "Curious and adaptable, Gemini loves communication and variety. Your quick mind and wit make you a natural storyteller and learner.",
    happiness: {
      faith:
        "Find meaning through exploration. Reading, writing, or teaching spiritual and philosophical ideas can feed your dual nature.",
      family:
        "Stay present in your relationships by practicing active listening. Deep conversations are as nourishing as new experiences.",
      work:
        "Engage your intellect with roles that require communication and adaptability. Variety keeps you inspired.",
      service:
        "Use your gift for words to advocate for causes or mentor others in communication skills.",
    },
  },
  Cancer: {
    sign: "Cancer",
    overview:
      "Nurturing and intuitive, Cancer is deeply connected to home and family. Your emotional depth allows you to empathize and care for others.",
    happiness: {
      faith:
        "Connect to your inner world through journaling or creative expression. Reflecting on emotions helps you find meaning.",
      family:
        "Prioritize time with family and close friends. Your nurturing presence brings safety and love to those around you.",
      work:
        "Seek roles where you can support and care for others, whether through teaching, healing, or creating safe spaces.",
      service:
        "Volunteer in community projects that protect and uplift vulnerable groups. Your empathy makes a difference.",
    },
  },
  Leo: {
    sign: "Leo",
    overview:
      "Confident and generous, Leo thrives in the spotlight and loves to share warmth and creativity. Your passion inspires others.",
    happiness: {
      faith:
        "Cultivate humility through gratitude and reflection. Connect to a higher purpose beyond personal recognition.",
      family:
        "Shine your light on loved ones by celebrating their achievements. Loyalty and generosity strengthen bonds.",
      work:
        "Lead with heart and authenticity. Creative pursuits and recognition fuel your motivation.",
      service:
        "Use your charisma to support charitable causes. Hosting events or raising awareness brings joy.",
    },
  },
  Virgo: {
    sign: "Virgo",
    overview:
      "Analytical and meticulous, Virgo seeks order and service. You excel at organizing, refining, and bringing structure to chaos.",
    happiness: {
      faith:
        "Practice acceptance; not everything needs perfection. Meditation or gentle movement can calm your mind.",
      family:
        "Share your helpful nature without overdoing it. Balance giving advice with simply listening and being present.",
      work:
        "Find satisfaction in roles requiring precision and problem-solving. Serve others through attention to detail.",
      service:
        "Volunteer in environments that benefit from your organizational skills. Your efficiency can uplift many.",
    },
  },
  Libra: {
    sign: "Libra",
    overview:
      "Diplomatic and charming, Libra seeks harmony and balance. You appreciate beauty and have a natural sense of fairness.",
    happiness: {
      faith:
        "Center yourself through artistic expression or contemplative practices. Harmony comes from inner balance.",
      family:
        "Cultivate deep connections by sharing heartfelt conversation and collaboration. Your grace creates peace.",
      work:
        "Engage in work involving aesthetics, justice, or mediation. Partnering with others suits your cooperative nature.",
      service:
        "Advocate for social justice or community arts programs. Your sense of fairness inspires positive change.",
    },
  },
  Scorpio: {
    sign: "Scorpio",
    overview:
      "Intense and transformative, Scorpio explores depth and mystery. Your passion and resilience empower profound change.",
    happiness: {
      faith:
        "Explore the unseen through meditation, psychology, or spiritual study. Transformation brings deeper meaning.",
      family:
        "Strengthen bonds through trust and vulnerability. Sharing your inner world nurtures intimacy.",
      work:
        "Pursue careers involving research, healing, or transformation. Your focus brings success.",
      service:
        "Support others through crisis counseling, mentorship, or advocacy. Your strength is a beacon.",
    },
  },
  Sagittarius: {
    sign: "Sagittarius",
    overview:
      "Adventurous and optimistic, Sagittarius loves freedom and exploration. You seek wisdom through travel and philosophy.",
    happiness: {
      faith:
        "Pursue spiritual learning and broad perspectives. Daily gratitude keeps your optimism grounded.",
      family:
        "Share your stories and curiosity with loved ones. Invite them on your adventures and respect their viewpoints.",
      work:
        "Choose roles that allow growth, travel, or knowledge sharing. Your enthusiasm is contagious.",
      service:
        "Teach or mentor others, especially about cultures or ideas. Sharing wisdom fuels joy.",
    },
  },
  Capricorn: {
    sign: "Capricorn",
    overview:
      "Disciplined and ambitious, Capricorn works steadily toward long-term goals. You value responsibility, tradition, and achievement.",
    happiness: {
      faith:
        "Find meaning in creating structures that endure. Balance ambition with reflection and rest.",
      family:
        "Demonstrate love through acts of service and reliability. Make time for connection beyond work.",
      work:
        "Pursue careers that reward dedication and leadership. Your patience and discipline lead to success.",
      service:
        "Mentor younger generations or contribute to institutions that foster growth. Your legacy inspires others.",
    },
  },
  Aquarius: {
    sign: "Aquarius",
    overview:
      "Innovative and humanitarian, Aquarius seeks to break conventions and foster community. Your vision is focused on the collective good.",
    happiness: {
      faith:
        "Explore unconventional spirituality or science to understand your place in the universe. Seek intellectual freedom.",
      family:
        "Connect deeply by honoring each person’s uniqueness. Authentic dialogue builds trust.",
      work:
        "Work in cutting-edge fields or social innovation. Collaborate with groups pushing boundaries.",
      service:
        "Volunteer for causes that promote equality and progress. Your ideas can transform communities.",
    },
  },
  Pisces: {
    sign: "Pisces",
    overview:
      "Compassionate and imaginative, Pisces feels deeply and dreams abundantly. You are intuitive and often drawn to the mystical.",
    happiness: {
      faith:
        "Nurture your spirituality through art, music, or meditation. Boundaries help maintain balance.",
      family:
        "Express love through empathy and understanding. Create safe spaces for open emotional exchanges.",
      work:
        "Engage in creative or healing professions. Your sensitivity enriches your work.",
      service:
        "Support humanitarian causes or healing arts. Channel your compassion into service.",
    },
  },
};

export default function HomePage() {
  const [formState, setFormState] = useState({
    name: "",
    date: "",
    time: "",
    place: "",
  });
  const [report, setReport] = useState<ReportData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.date) {
      return;
    }
    const sign = calculateZodiacSign(formState.date);
    const data = signMeanings[sign];
    setReport(data);
  };

  const reset = () => {
    setReport(null);
  };

  return (
    <>
      <Head>
        <title>Astro Happiness Planner</title>
        <meta
          name="description"
          content="Discover your astrological insights and manage happiness through simple daily habits."
        />
      </Head>
      <Container maxW="3xl" py={12}>
        <Box borderRadius="lg" overflow="hidden" mb={8} boxShadow="md">
          {/* Hero image visualizes the cosmic theme */}
          <Image
            src="/assets/cosmos.png"
            alt="Cosmic background"
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Heading as="h1" size="xl" mb={6} textAlign="center">
          Astro Happiness Planner
        </Heading>
        {!report && (
          <Box
            as="form"
            onSubmit={handleSubmit}
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            borderRadius="md"
            boxShadow="sm"
          >
            <VStack spacing={4} align="stretch">
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Your name (optional)"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="date" isRequired>
                <FormLabel>Date of Birth</FormLabel>
                <Input
                  type="date"
                  name="date"
                  value={formState.date}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="time">
                <FormLabel>Time of Birth</FormLabel>
                <Input
                  type="time"
                  name="time"
                  value={formState.time}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl id="place">
                <FormLabel>Place of Birth</FormLabel>
                <Input
                  placeholder="City, Country"
                  name="place"
                  value={formState.place}
                  onChange={handleChange}
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                size="lg"
                mt={4}
              >
                Generate Report
              </Button>
            </VStack>
          </Box>
        )}
        {report && (
          <Box
            bg="white"
            _dark={{ bg: "gray.800" }}
            p={6}
            borderRadius="md"
            boxShadow="sm"
          >
            <Heading as="h2" size="lg" mb={4}>
              {formState.name
                ? `Hello ${formState.name}, you are a ${report.sign}!`
                : `You are a ${report.sign}!`}
            </Heading>
            <Text fontSize="md" mb={4}>
              {report.overview}
            </Text>
            <Divider my={4} />
            <Heading as="h3" size="md" mb={2}>
              Happiness Insights
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box>
                <Heading as="h4" size="sm" mb={1}>
                  Faith & Meaning
                </Heading>
                <Text fontSize="sm">{report.happiness.faith}</Text>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={1}>
                  Family & Relationships
                </Heading>
                <Text fontSize="sm">{report.happiness.family}</Text>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={1}>
                  Work & Purpose
                </Heading>
                <Text fontSize="sm">{report.happiness.work}</Text>
              </Box>
              <Box>
                <Heading as="h4" size="sm" mb={1}>
                  Service & Contribution
                </Heading>
                <Text fontSize="sm">{report.happiness.service}</Text>
              </Box>
            </SimpleGrid>
            <Button mt={6} onClick={reset}>
              Back
            </Button>
          </Box>
        )}
      </Container>
    </>
  );
}