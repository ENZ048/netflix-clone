import { useEffect, useState } from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";
import { ChevronRight, Tv, Download, Earth, User } from "lucide-react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Container,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import axios from "axios";

export default function LandingPage() {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState([]);

  const handleFormSubmit = (e) => {
    e.preventDeafault();
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/api/v1/trendingIndia"
        );
        console.log(res.data.content);
        setContent(res.data.content);
      } catch (err) {
        console.error("Error fetching trending content", err);
      }
    };
    fetchTrending();
  }, []);

  const faqs = [
    {
      question: "What is Netflix?",
      answer: "Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!",
    },
    { question: "How much does Netflix cost?", answer: "Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹149 to ₹649 a month. No extra costs, no contracts." },
    {
      question: "Where can I watch?",
      answer: "Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles. You can also download your favourite shows with the iOS or Android app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
    },
    {
      question: "How do I cancel?",
      answer: "Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.",
    },
    {
      question: "What can I watch on Netflix?",
      answer: "Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
    },
    {
      question: "Is Netflix good for kids?",
      answer: "The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
    },
  ];

  return (
    <div className="hero-bg">
      <header className="navbar">
        <img src="/netflix-logo.png" alt="Netflix Logo" className="logo" />
        <Link to="/login" className="signin-btn">
          Sign In
        </Link>
      </header>

      <div className="hero-content">
        <h1 className="hero-title">Unlimited movies, TV shows, and more</h1>
        <p className="hero-subtitle">Starts at ₹149. Cancel at any time.</p>
        <p className="hero-description">
          Ready to watch? Enter your email to create or restart your membership.
        </p>

        <form className="hero-form" onSubmit={handleFormSubmit}>
          <input
            type="email"
            placeholder="Email address"
            className="email-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="get-started-btn">
            Get Started <ChevronRight className="chevron-icon" />
          </button>
        </form>
      </div>

      <div className="trending-wrapper">
        <div className="trending-container">
          <h2 className="trending-title">Trending Now</h2>
          <div className="trending-carousel">
            {content.map((item, index) => (
              <div key={item.id} className="trending-item">
                <img
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt={item.title || item.name}
                />
                <div className="trending-rank">{index + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="more-reasons-wrapper">
        <div className="more-reasons">
          <h1 className="reasons-title">More reasons to join</h1>
          <div className="reasons-container">
            <div className="reason-card">
              <div className="reason-text">
                <h2>Enjoy on your TV</h2>
                <p>
                  Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV,
                  Blu-ray players and more.
                </p>
              </div>

              <div className="reason-img">
                <Tv size={44} color="#ff0000" />
              </div>
            </div>
            <div className="reason-card">
              <div className="reason-text">
                <h2>Download your shows to watch offline</h2>
                <p>
                  Save your favourites easily and always have something to
                  watch.
                </p>
              </div>

              <div className="reason-img">
                <Download size={44} color="#ff0000" />
              </div>
            </div>
            <div className="reason-card">
              <div className="reason-text">
                <h2>Watch everywhere</h2>
                <p>
                  Stream unlimited movies and TV shows on your phone, tablet,
                  laptop and TV.
                </p>
              </div>

              <div className="reason-img">
                <Earth size={44} color="#ff0000" />
              </div>
            </div>
            <div className="reason-card">
              <div className="reason-text">
                <h2>Create profiles for kids</h2>
                <p>
                  Send kids on adventures with their favourite characters in a
                  space made just for them — free with your membership.
                </p>
              </div>

              <div className="reason-img">
                <User size={44} color="#ff0000" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="faq-wrapper">
        <Container maxWidth="md" sx={{ pt: 8, bgcolor: "black" }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Frequently Asked Questions
          </Typography>
          {faqs.map((faq, idx) => (
            <Accordion
              key={idx}
              sx={{ bgcolor: "#2d2d2d", color: "#fff", mb: 1 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
              >
                <Typography fontWeight="bold">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </Container>
      </div>

      <div className="footer">
      <p className="footer-contact">Questions? Call <a href="#">000-800-919-1743</a></p>
      <div className="footer-links">
        <ul>
          <li><a href="#">FAQ</a></li>
          <li><a href="#">Investor Relations</a></li>
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Speed Test</a></li>
        </ul>
        <ul>
          <li><a href="#">Help Centre</a></li>
          <li><a href="#">Jobs</a></li>
          <li><a href="#">Cookie Preferences</a></li>
          <li><a href="#">Legal Notices</a></li>
        </ul>
        <ul>
          <li><a href="#">Account</a></li>
          <li><a href="#">Ways to Watch</a></li>
          <li><a href="#">Corporate Information</a></li>
          <li><a href="#">Only on Netflix</a></li>
        </ul>
        <ul>
          <li><a href="#">Media Centre</a></li>
          <li><a href="#">Terms of Use</a></li>
          <li><a href="#">Contact Us</a></li>
        </ul>
      </div>
      <div className="footer-lang">
        <select>
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
      </div>
      <p className="footer-note">Netflix India</p>
    </div>
    </div>
  );
}
