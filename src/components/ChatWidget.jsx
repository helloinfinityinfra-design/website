import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Sparkles, RotateCcw, HelpCircle, Check, Database } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';

// ─── Environment Configurations ────────────────────────────────────────────────
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const openai = OPENAI_API_KEY
  ? new OpenAI({
      apiKey: OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    })
  : null;

const gemini = GEMINI_API_KEY
  ? new GoogleGenerativeAI(GEMINI_API_KEY)
  : null;

// ─── Website Context Database (RAG Document Store) ──────────────────────────
export const WEB_DOCUMENTS = [
  {
    id: 'overview',
    title: 'Infinity Construction Overview',
    keywords: ['company', 'infinity construction', 'who are you', 'about', 'overview', 'infinity construct', 'nepal', 'services'],
    source: 'Home & About Page',
    content: `**Infinity Construction Pvt. Ltd.** (Infinity Construct) is one of the largest construction and home inspection companies in Nepal, established in 2015. Over the past 9+ years, we have completed over **500+ projects** in the Kathmandu Valley.

We specialize in:
• **Residential & Commercial Construction** (Homes, apartments, offices)
• **Professional Home Inspection & Structural Auditing**
• **Modern Interior Design & Renovation**
• **Earthquake-Resistant structural engineering** under the Nepal Building Code (NBC).

Our team consists of 50+ expert civil engineers, architects, and designers dedicated to bringing global building standards to Nepal.`
  },
  {
    id: 'services',
    title: 'Company Services & Offerings',
    keywords: ['services', 'offer', 'provide', 'do you do', 'work', 'renovate', 'design', 'inspect', 'build'],
    source: 'Services Page',
    content: `We offer a full suite of construction and engineering solutions:

• **Home Inspection:** Detailed structural, safety, dampness, and moisture auditing by certified inspectors.
• **Modern Construction:** Turnkey building services with modern architectural design for houses, offices, and complexes.
• **Interior Renovation:** Modern kitchen remodels, false ceilings, tile work, painting, and space upgrades.
• **Architectural Design:** Custom 2D/3D maps, floor planning, elevation design, and municipal approvals.
• **Structural Design:** Structural safety analysis and earthquake-resistant plans complying with NBC.
• **Plumbing & Electrical:** Advanced mechanical, plumbing, and electrical system mapping and installation.`
  },
  {
    id: 'pricing',
    title: 'Construction Cost & Rates per Sq. Ft.',
    keywords: ['cost', 'pricing', 'rates', 'price', 'per sqft', 'square foot', 'how much', 'budget', 'estimate', 'charge', 'expensive', 'cheap', 'grade'],
    source: 'Cost Guide & Pricing Page',
    content: `Our home construction rates in Kathmandu Valley for 2025:

| Grade | Rate (per sq.ft) | Finishes & Features |
| :--- | :--- | :--- |
| 🥉 **Basic** | NPR 2,000–2,500 | Standard local materials & finishes |
| 🥈 **Standard** | NPR 2,500–3,500 | Brand name local materials, mid-range fittings |
| 🥇 **Premium** | NPR 3,500–5,000 | High-end finishes, granite/marble, premium accessories |
| 💎 **Luxury** | NPR 5,000+ | Imported luxury materials, smart home integration, custom work |

*Note: Rates vary depending on location accessibility, design complexity, and material selections.*
We offer a **[Free Detailed Estimate](#contact)** and site visit! Call us to schedule.`
  },
  {
    id: 'earthquake',
    title: 'Earthquake-Resistant Construction & NBC Standards',
    keywords: ['earthquake', 'safety', 'seismic', 'nbc', 'nepal building code', 'safe', 'resistant', 'foundation', 'column', 'beam'],
    source: 'Structural Engineering Page',
    content: `Seismic safety is our highest priority. All Infinity Construction structures strictly follow the **Nepal Building Code (NBC)**.

Key earthquake-resistant details we implement:
• **Deep RCC Foundations:** Dug 4-5 feet minimum to rest on firm soil.
• **Ductile Reinforcement:** Using Fe500D grade TMT steel bars (Jagdamba/Himal) with precise stirrup spacing.
• **Symmetric Structure:** Designing symmetric plans to prevent twisting forces during tremors.
• **Quality Concrete:** Using M20/M25 concrete mix (minimum 1:1.5:3 ratio) with supervised curing (minimum 14 days).
• **Beam-Column Integrity:** Strict joint configurations to avoid soft stories and collapse.`
  },
  {
    id: 'team',
    title: 'Meet Our Experts',
    keywords: ['team', 'staff', 'engineers', 'architect', 'ceo', 'shreedhar', 'sagar', 'poudel', 'podel', 'aarav', 'nisha', 'prabesh', 'founder', 'who works'],
    source: 'Team Page',
    content: `Our leadership and core technical team includes:

• **Shreedhar Chalise** — Founder & CEO. Visionary leader pushing for tech-enabled building standards in Nepal.
• **Sagar Poudel** — Founder & CEO. Co-founder leading technical operations and project execution.
• **Aarav Sharma** — Lead Architect. Specialized in modern and traditional Nepali fusion styles.
• **Nisha Shrestha** — Project Manager. Overlooks client scheduling, material procurement, and timely deliveries.
• **Prabesh Thapa** — Civil Engineer. Structural auditor and site supervisor ensuring NBC compliance.

We have a larger staff of **50+ engineers, supervisors, and skilled craftsmen** working daily on-site.`
  },
  {
    id: 'contact',
    title: 'Contact Details & Office Location',
    keywords: ['contact', 'phone', 'call', 'number', 'email', 'location', 'address', 'office', 'where', 'map', 'whatsapp', 'reach'],
    source: 'Contact Page & Footer',
    content: `Reach Infinity Construction Pvt. Ltd. through any of the following channels:

• 📱 **Phone/WhatsApp:** +977 9801234567
• ✉️ **Email:** info@infinityconstruction.com
• 📍 **Office Address:** Satdobato-Tikabhairab Rd, Chapagaun 44700, Lalitpur, Nepal (Kathmandu Valley)
• 🕐 **Working Hours:** Monday to Saturday, 9:00 AM – 6:00 PM
• 🗺️ **Interactive Map:** Available in the website footer.

Feel free to visit our office or message us on WhatsApp for immediate support!`
  },
  {
    id: 'process',
    title: 'Construction Process & Timeline',
    keywords: ['process', 'timeline', 'how long', 'how do you work', 'steps', 'duration', 'phases', 'schedule', 'permit', 'nagar palika'],
    source: 'Process Guide',
    content: `We break down house construction into a clear 7-step process:

1. **Free Consultation:** Understand requirements & budget.
2. **Site Survey & Soil Test:** Evaluate soil capacity and topography.
3. **Architectural & Structural Design:** Produce custom 2D/3D models.
4. **Municipal Approvals:** We handle all building permit (Nagar Palika) paperwork.
5. **Phase-wise Construction:** Foundations, frame, brickwork, plastering, plumbing, and electrical.
6. **Double Inspection:** Multi-level quality checks at every milestone.
7. **Handover:** Full walkthrough with final warranty documentation.

**Timeline Estimates:**
• 1–2 Storey House: **6–9 months**
• 3 Storey House: **9–12 months**
• Renovations: **1–3 months**`
  },
  {
    id: 'materials',
    title: 'Building Materials & Brands We Use',
    keywords: ['materials', 'cement', 'steel', 'brands', 'brick', 'wood', 'supplier', 'sand', 'aggregate'],
    source: 'Materials Blog',
    content: `We use only certified, high-grade materials to guarantee durability:

• **Cement:** Shivam Cement (Nepal's top brand), Hetauda, and premium options like Ultratech/Ambuja.
• **TMT Steel Rebars:** Fe500D grade bars from Jagdamba Steel, Himal Steel, and Panchakanya.
• **Bricks:** Uniform, machine-pressed bricks (minimum strength 35 kg/cm²).
• **Wood:** High-grade, durable Sal wood for door/window frames.
• **Sand & Aggregate:** Sourced from verified suppliers, washed to ensure zero silt and clay.
• **Fittings:** uPVC frames for moisture resistance, aluminium, and premium sanitary options.`
  },
  {
    id: 'interior_trends',
    title: 'Modern Interior Design Trends for 2025',
    keywords: ['interior', 'design', 'trends', '2025', 'kitchen', 'bedroom', 'living room', 'biophilic', 'dhaka', 'smart home'],
    source: 'Blogs: Interior Design',
    content: `The top interior design trends for Nepali homes in 2025:

• **Biophilic Design:** Integrating natural wood, stone, plants, and natural skylights to create an indoor sanctuary.
• **Nepali-Modern Fusion:** Blending modern layouts with cultural touches like wood carving art pieces and Dhaka-patterned fabrics.
• **Smart Home Automation:** Wiring for smart LED lighting, automated curtains, smart speakers, and app-controlled security locks.
• **Modular Island Kitchens:** Sleek L or U-shaped cabinets in sage green or matte white, quartz countertops, and built-in appliances.`
  },
  {
    id: 'renovation_guide',
    title: 'Home Renovation Steps & Pitfalls',
    keywords: ['renovation', 'renovate', 'old house', 'upgrades', 'pitfalls', 'mistakes', 'steps'],
    source: 'Blogs: Renovation',
    content: `When remodeling an older house in Kathmandu, follow this sequence:

1. **Structural Audit:** First fix cracks, foundation issues, and load limits.
2. **Concealed Work:** Run new plumbing pipes and electrical wiring.
3. **Waterproofing:** Apply premium seals on terraces, bathrooms, and basements.
4. **Plaster & Tile:** Wall finishing, marble, granite, or wood flooring.
5. **Fixtures & Painting:** Installing wardrobes, kitchen cabinets, and final paints.

**Common Pitfalls to Avoid:**
• Skipping professional waterproofing (causes leakage that ruins paint/furniture).
• Changing structural columns or walls without an engineer's assessment.`
  }
];

// ─── FAQ Quick Suggestion Chips ───────────────────────────────────────────────
const CHIPS_DATA = [
  { label: '💰 Cost Per Sq. Ft.', query: 'What is the construction cost per square foot in Kathmandu?' },
  { label: '🏠 Earthquake NBC Rules', query: 'Do you follow the Nepal Building Code (NBC) for earthquake safety?' },
  { label: '🎨 2025 Interior Trends', query: 'What are the modern interior design trends for Nepali homes in 2025?' },
  { label: '📞 Phone & Office', query: 'How can I contact you and where is your office located?' },
  { label: '🔄 7-Step Process', query: 'What is your step by step construction process?' },
  { label: '🧱 Materials & Brands', query: 'What brands of cement and steel do you use for construction?' },
];

// ─── System Prompt for Cloud AIs (Gemini & OpenAI) ─────────────────────────────
const SYSTEM_PROMPT = `You are a warm, professional, and extremely knowledgeable AI assistant for **Infinity Construction Pvt. Ltd.** (Infinity Construct), a leading construction, renovation, and home inspection company in Nepal, founded in 2015.

You have access to the exact pages and contents of the Infinity Construction website. Use this data as your ground truth to answer questions.

=== WEBSITE KNOWLEDGE BASE ===
${WEB_DOCUMENTS.map(doc => `[Section: ${doc.title} | Source: ${doc.source}]\n${doc.content}`).join('\n\n')}
=== END KNOWLEDGE BASE ===

Your guidelines:
1. **Warm & Professional**: Be friendly, polite, and professional. Use formatting (bold, bullet points, headers) to make answers scannable.
2. **Grounding**: Answer user questions using the knowledge base. If they ask about services, costs, timelines, or our team, pull directly from the rates/tables/details in the knowledge base.
3. **Nepalese Context**: Understand local details like Kathmandu Valley regions (Kathmandu, Lalitpur, Chapagaun, Bhaktapur), the Nepal Building Code (NBC), and local brands (Shivam Cement, Hetauda Cement, Jagdamba Steel).
4. **Formatting Tables**: Always display cost/rate plans in a clear Markdown table format.
5. **No Hallucination**: If asked about things not covered in the database or unrelated to construction, politely redirect them back to our construction and renovation services.
6. **Nepali Language**: If the user writes in Nepali (or romanized Nepali), respond in natural, friendly Nepali language.
7. **Consultation CTA**: For pricing, design, or project queries, always suggest booking a free consultation via the website form or calling +977 9801234567. Include anchor links like "[Book a consultation](#contact)" if appropriate.`;

// ─── Local AI Search Engine ───────────────────────────────────────────────────
const searchWebContext = (query) => {
  const cleanQuery = query.toLowerCase().replace(/[?,.!/\\()#@]/g, ' ');
  const queryWords = cleanQuery.split(/\s+/).filter(w => w.length > 2);
  
  if (queryWords.length === 0) return null;

  let bestDoc = null;
  let maxScore = 0;
  
  WEB_DOCUMENTS.forEach(doc => {
    let score = 0;
    
    // Check keyword matches (high weight)
    doc.keywords.forEach(kw => {
      if (cleanQuery.includes(kw)) {
        score += 5;
      }
      const kwWords = kw.split(' ');
      if (kwWords.length > 1) {
        let matchCount = 0;
        kwWords.forEach(kww => {
          if (cleanQuery.includes(kww)) matchCount++;
        });
        if (matchCount === kwWords.length) {
          score += 8;
        }
      }
    });

    // Check query word matches in content (lower weight)
    queryWords.forEach(word => {
      const escapedWord = word.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp('\\b' + escapedWord + '\\b', 'gi');
      const matches = doc.content.match(regex);
      if (matches) {
        score += matches.length * 0.5;
      }
    });

    if (score > maxScore) {
      maxScore = score;
      bestDoc = doc;
    }
  });

  return maxScore > 2 ? bestDoc : null;
};

// ─── Cloud AI API Call Handlers ────────────────────────────────────────────────
async function getGeminiReply(userMessage, chatHistory) {
  if (!gemini) throw new Error('NO_API_KEY');

  const model = gemini.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const contents = [
    {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }]
    },
    {
      role: 'model',
      parts: [{ text: "Understood. I will act as the warm, professional, and knowledgeable AI assistant for Infinity Construction Pvt. Ltd. and use the detailed company information, FAQ, and blog details to answer all visitor queries accurately. How can I help you today?" }]
    },
    ...chatHistory.slice(-8).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      parts: [{ text: msg.text }]
    })),
    {
      role: 'user',
      parts: [{ text: userMessage }]
    }
  ];

  const result = await model.generateContent({ contents });
  const response = await result.response;
  return response.text().trim();
}

async function getOpenAIReply(userMessage, chatHistory) {
  if (!openai) throw new Error('NO_API_KEY');

  const messages = [
    { role: 'system', content: SYSTEM_PROMPT },
    ...chatHistory.slice(-8).map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    })),
    { role: 'user', content: userMessage },
  ];

  const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    max_tokens: 450,
    temperature: 0.6,
  });

  return completion.choices[0].message.content.trim();
}

// ─── Typing Dots Animation ────────────────────────────────────────────────────
const TypingDots = () => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 5, padding: '4px 2px' }}>
    {[0, 1, 2].map(i => (
      <motion.div
        key={i}
        style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--secondary)' }}
        animate={{ y: [-3, 3, -3], opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
      />
    ))}
  </div>
);

// ─── Custom Markdown Inline & Block Parser ───────────────────────────────────
const parseMarkdown = (text) => {
  if (!text) return '';
  
  const lines = text.split('\n');
  const elements = [];
  let currentTable = null;
  
  const flushTable = (key) => {
    if (currentTable) {
      const tableObj = (
        <div key={key} style={{ overflowX: 'auto', margin: '14px 0', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                {currentTable.headers.map((h, idx) => (
                  <th key={idx} style={{ padding: '10px 14px', fontWeight: 600, color: 'var(--secondary)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentTable.rows.map((row, rIdx) => (
                <tr 
                  key={rIdx} 
                  style={{ 
                    borderBottom: rIdx < currentTable.rows.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                    background: rIdx % 2 === 1 ? 'rgba(255,255,255,0.01)' : 'transparent'
                  }}
                >
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} style={{ padding: '10px 14px', color: '#cbd5e1' }}>
                      {renderInlineStyles(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      currentTable = null;
      return tableObj;
    }
    return null;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Table line match
    if (line.startsWith('|')) {
      const cells = line.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
      const isSeparator = cells.every(c => {
        const clean = c.replace(/:/g, '').trim();
        return clean.length > 0 && clean.split('').every(char => char === '-');
      });
      
      if (isSeparator) continue;
      
      if (!currentTable) {
        currentTable = { headers: cells, rows: [] };
      } else {
        currentTable.rows.push(cells);
      }
    } else {
      const flushed = flushTable(`table-${i}`);
      if (flushed) elements.push(flushed);
      
      if (line === '') {
        elements.push(<div key={`br-${i}`} style={{ height: 6 }} />);
      } else if (line.startsWith('###')) {
        elements.push(
          <h4 key={i} style={{ color: 'var(--bg-white)', fontSize: '0.94rem', fontWeight: 700, margin: '14px 0 6px 0', borderBottom: '1px solid rgba(247,245,240,0.08)', paddingBottom: 4 }}>
            {line.replace(/^###\s*/, '')}
          </h4>
        );
      } else if (line.startsWith('##')) {
        elements.push(
          <h3 key={i} style={{ color: 'var(--bg-white)', fontSize: '1.05rem', fontWeight: 700, margin: '16px 0 8px 0', borderBottom: '1px solid rgba(247,245,240,0.08)', paddingBottom: 4 }}>
            {line.replace(/^##\s*/, '')}
          </h3>
        );
      } else if (line.startsWith('•') || line.startsWith('*') || line.startsWith('-')) {
        const textContent = line.replace(/^[•*\-]\s*/, '');
        elements.push(
          <div key={i} style={{ display: 'flex', gap: 6, margin: '6px 0', paddingLeft: 4, alignItems: 'flex-start', fontSize: '0.85rem' }}>
            <span style={{ color: 'var(--secondary)', flexShrink: 0, marginTop: '2px' }}>•</span>
            <span style={{ color: '#cbd5e1', lineHeight: 1.5 }}>{renderInlineStyles(textContent)}</span>
          </div>
        );
      } else {
        const numMatch = line.match(/^(\d+)\.\s+(.*)/);
        if (numMatch) {
          const num = numMatch[1];
          const textContent = numMatch[2];
          elements.push(
            <div key={i} style={{ display: 'flex', gap: 8, margin: '6px 0', paddingLeft: 4, alignItems: 'flex-start', fontSize: '0.85rem' }}>
              <span style={{ color: 'var(--secondary)', fontWeight: 700, flexShrink: 0 }}>{num}.</span>
              <span style={{ color: '#cbd5e1', lineHeight: 1.5 }}>{renderInlineStyles(textContent)}</span>
            </div>
          );
        } else {
          elements.push(
            <p key={i} style={{ margin: '6px 0', color: '#cbd5e1', fontSize: '0.86rem', lineHeight: 1.6 }}>
              {renderInlineStyles(line)}
            </p>
          );
        }
      }
    }
  }
  
  const flushed = flushTable('table-end');
  if (flushed) elements.push(flushed);
  
  return elements;
};

const renderInlineStyles = (text) => {
  if (!text) return '';
  
  const parts = text.split(/(\[.*?\]\(.*?\))/g);
  
  return parts.map((part, idx) => {
    if (part.startsWith('[') && part.includes('](')) {
      const match = part.match(/\[(.*?)\]\((.*?)\)/);
      if (match) {
        const linkText = match[1];
        const linkUrl = match[2];
        const isAnchor = linkUrl.startsWith('#');
        
        return (
          <a
            key={idx}
            href={linkUrl}
            onClick={isAnchor ? (e) => {
              e.preventDefault();
              const target = document.querySelector(linkUrl);
              if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            } : undefined}
            style={{ color: 'var(--secondary)', textDecoration: 'underline', fontWeight: 600, cursor: 'pointer' }}
            target={isAnchor ? undefined : '_blank'}
            rel={isAnchor ? undefined : 'noopener noreferrer'}
          >
            {linkText}
          </a>
        );
      }
    }
    
    const boldParts = part.split(/(\*\*.*?\*\*)/g);
    return boldParts.map((bPart, bIdx) => {
      if (bPart.startsWith('**') && bPart.endsWith('**')) {
        return <strong key={`${idx}-${bIdx}`} style={{ color: 'var(--bg-white)', fontWeight: 700 }}>{bPart.slice(2, -2)}</strong>;
      }
      return bPart;
    });
  });
};

// ─── Message Bubble ───────────────────────────────────────────────────────────
const MessageBubble = ({ msg }) => {
  const isUser = msg.sender === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', marginBottom: 14 }}
    >
      {!isUser && (
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          marginRight: 10, flexShrink: 0, alignSelf: 'flex-start',
          boxShadow: '0 4px 10px rgba(0,144,76,0.2)',
          border: '1px solid rgba(255,255,255,0.1)'
        }}>
          <Bot size={16} color="white" />
        </div>
      )}
      <div style={{
        maxWidth: '82%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start'
      }}>
        <div style={{
          padding: '12px 16px',
          borderRadius: isUser ? '20px 20px 4px 20px' : '4px 20px 20px 20px',
          background: isUser 
            ? 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)'
            : 'rgba(255, 255, 255, 0.05)',
          color: 'var(--bg-white)',
          boxShadow: isUser ? '0 6px 16px rgba(48,51,135,0.3)' : '0 4px 12px rgba(0,0,0,0.15)',
          border: isUser ? 'none' : '1px solid rgba(255,255,255,0.06)',
          backdropFilter: isUser ? 'none' : 'blur(8px)',
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
        }}>
          {parseMarkdown(msg.text)}
        </div>
        
        {/* Source / Engine indicator */}
        {!isUser && msg.engine && (
          <span style={{ 
            fontSize: '0.65rem', 
            color: 'rgba(255,255,255,0.3)', 
            marginTop: 4, 
            paddingLeft: 4,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            <Sparkles size={8} style={{ color: 'var(--secondary)' }} />
            Powered by {msg.engine}
          </span>
        )}
      </div>
    </motion.div>
  );
};

// ─── Main ChatWidget Component ────────────────────────────────────────────────
const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{
    id: 1,
    text: "Greetings! 👋 I am **Infinity-AI**, your dedicated construction and home inspection assistant.\n\nI have complete access to the website content and can answer queries about our **services, construction costs, structural safety/NBC standards, projects, and active blogs**.\n\nSelect one of the topics below or ask a question directly!",
    sender: 'ai',
    engine: 'Infinity Knowledge Engine'
  }]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat' or 'help'

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const sendMessage = async (text) => {
    const cleanText = text.trim();
    if (!cleanText || isTyping) return;

    setError(null);
    const userMsg = { id: Date.now(), text: cleanText, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      let reply;
      let usedEngine = '';
      const startTime = Date.now();

      if (gemini) {
        try {
          reply = await getGeminiReply(cleanText, messages);
          usedEngine = 'Gemini 1.5 Flash';
        } catch (geminiErr) {
          console.warn('Gemini failed, falling back to OpenAI:', geminiErr.message);
          if (openai) {
            reply = await getOpenAIReply(cleanText, messages);
            usedEngine = 'GPT-3.5 Turbo';
          } else {
            throw geminiErr;
          }
        }
      } else if (openai) {
        reply = await getOpenAIReply(cleanText, messages);
        usedEngine = 'GPT-3.5 Turbo';
      } else {
        // Local AI Search Matcher
        const delay = Math.max(1200 - (Date.now() - startTime), 400);
        await new Promise(r => setTimeout(r, delay));
        
        const docMatch = searchWebContext(cleanText);
        if (docMatch) {
          reply = `**Scanning website database...** 🔍\n\nHere is what I found regarding **${docMatch.title}**:\n\n${docMatch.content}\n\n*Source: [${docMatch.source}]*`;
          usedEngine = 'Local AI Search';
        } else {
          reply = `I scanned our website index for that query but couldn't find a direct match. Let me provide some relevant details:\n\n• **Services:** Home inspection, modern building construction, interior renovation, and architectural/structural drawings (NBC-compliant).\n• **Pricing:** Construction rates start at NPR 2,000–2,500/sqft (Basic) to NPR 5,000+/sqft (Luxury).\n• **Our Office:** Chapagaun, Lalitpur (Satdobato-Tikabhairab Road).\n• **Call/WhatsApp:** +977 9801234567\n\nWould you like to [book a free consultation](#contact) or call CEO **Shreedhar Chalise**?`;
          usedEngine = 'Local AI Search';
        }
      }

      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: reply, 
        sender: 'ai', 
        engine: usedEngine 
      }]);
    } catch (err) {
      console.error('Chat error:', err);
      // Fallback
      const docMatch = searchWebContext(cleanText);
      const fallbackReply = docMatch
        ? `**Local Database Fallback** 🔍\n\n${docMatch.content}\n\n*Source: [${docMatch.source}]*`
        : `Thank you for your question! 😊\n\nI am experiencing a cloud connection issue, but our support team is available:\n• 📞 **+977 9801234567** (WhatsApp/Call)\n• ✉️ **info@infinityconstruction.com**`;
      
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: fallbackReply, 
        sender: 'ai', 
        engine: 'Offline Database Engine' 
      }]);
      
      setError('Cloud AI connection limit. Running in local database mode.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    sendMessage(inputText);
  };

  const resetChat = () => {
    setMessages([{
      id: Date.now(),
      text: "Chat database reset! 🔄 Ask me anything about Infinity Construction services, home inspections, costs, or blogs.",
      sender: 'ai',
      engine: 'System Sync'
    }]);
    setError(null);
    setActiveTab('chat');
  };

  return (
    <>
      {/* ── Responsive Chat Widget Styles ── */}
      <style>{`
        .chat-widget-anchor {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          z-index: 9999;
        }

        .chat-widget-drawer {
          width: 410px;
          height: 600px;
          position: absolute;
          bottom: calc(100% + 1rem);
          right: 0;
        }

        .chat-widget-btn {
          width: 64px;
          height: 64px;
        }

        /* ── ≤768px tablet / large phone ── */
        @media (max-width: 768px) {
          .chat-widget-anchor {
            bottom: 1.5rem;
            right: 1rem;
          }

          .chat-widget-drawer {
            width: calc(100vw - 2rem);
            height: 75vh;
            max-height: 560px;
            right: 0;
          }

          .chat-widget-btn {
            width: 56px;
            height: 56px;
          }
        }

        /* ── ≤425px small mobile ── */
        @media (max-width: 425px) {
          .chat-widget-anchor {
            bottom: 1rem;
            right: 0.5rem;
          }

          .chat-widget-drawer {
            width: calc(100vw - 1rem);
            height: 80vh;
            max-height: 520px;
            right: 0;
          }

          .chat-widget-btn {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>

      <div className="chat-widget-anchor">

        {/* ── Chat Window ── */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="chat-widget-drawer"
              initial={{ opacity: 0, y: 35, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 35, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              style={{
                background: '#0d0e1c',
                borderRadius: 24,
                boxShadow: '0 24px 70px rgba(0, 0, 0, 0.45), 0 0 20px rgba(48,51,135,0.25)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontFamily: "'Inter', sans-serif"
              }}
            >
              {/* Header */}
              <div style={{
                background: 'linear-gradient(135deg, #16172e 0%, #1c1d3a 50%, #0d0e1c 100%)',
                padding: '16px 20px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexShrink: 0,
              }}>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      width: 42, height: 42, borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      flexShrink: 0,
                    }}>
                      <Bot size={22} color="var(--secondary)" />
                    </div>
                    {/* Glowing active indicator */}
                    <span style={{
                      position: 'absolute', bottom: 0, right: 0,
                      width: 11, height: 11, borderRadius: '50%',
                      background: 'var(--secondary)', border: '2px solid var(--primary)',
                      boxShadow: '0 0 8px var(--secondary)'
                    }} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.96rem', color: 'var(--bg-white)', display: 'flex', alignItems: 'center', gap: 5 }}>
                      INFINITY-AI <Sparkles size={13} style={{ color: 'var(--secondary)' }} />
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.45)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                      <Database size={10} style={{ color: 'var(--secondary)' }} />
                      Synced Website Context (V2)
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 6 }}>
                  {[
                    { icon: <RotateCcw size={13} />, action: resetChat, title: 'Reset Chat' },
                    { icon: <HelpCircle size={14} />, action: () => setActiveTab(activeTab === 'chat' ? 'help' : 'chat'), title: 'Help Info' },
                    { icon: <X size={15} />, action: () => setIsOpen(false), title: 'Close' },
                  ].map((btn, i) => (
                    <button key={i} onClick={btn.action} title={btn.title}
                      style={{
                        background: activeTab === 'help' && btn.title === 'Help Info' ? 'rgba(74,222,128,0.15)' : 'rgba(255,255,255,0.05)', 
                        border: 'none', 
                        color: activeTab === 'help' && btn.title === 'Help Info' ? 'var(--secondary)' : 'var(--bg-white)',
                        width: 32, height: 32, borderRadius: '50%',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', transition: 'all 0.2s',
                        border: activeTab === 'help' && btn.title === 'Help Info' ? '1px solid rgba(74,222,128,0.3)' : '1px solid rgba(255,255,255,0.05)'
                      }}
                      onMouseOver={e => {
                        if (!(activeTab === 'help' && btn.title === 'Help Info')) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                        }
                      }}
                      onMouseOut={e => {
                        if (!(activeTab === 'help' && btn.title === 'Help Info')) {
                          e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                        }
                      }}
                    >
                      {btn.icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Error Banner */}
              {error && (
                <div style={{
                  background: 'rgba(200, 138, 61, 0.1)', color: 'var(--secondary)',
                  padding: '8px 16px', fontSize: '0.72rem',
                  borderBottom: '1px solid rgba(239, 68, 68, 0.15)', flexShrink: 0,
                  display: 'flex', alignItems: 'center', gap: 6
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--secondary)' }} />
                  {error}
                </div>
              )}

              {/* Body Content Switcher */}
              <div style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                background: 'linear-gradient(180deg, #090a14 0%, #0d0e1c 100%)'
              }}>
                {activeTab === 'chat' ? (
                  <>
                    {/* Message Area */}
                    <div style={{
                      flex: 1, padding: 16, overflowY: 'auto',
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(255,255,255,0.1) transparent',
                    }}>
                      {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}

                      {/* Typing indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 14 }}
                        >
                          <div style={{
                            width: 32, height: 32, borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                            border: '1px solid rgba(255,255,255,0.1)'
                          }}>
                            <Bot size={16} color="white" />
                          </div>
                          <div style={{
                            background: 'rgba(255, 255, 255, 0.05)', padding: '12px 16px',
                            borderRadius: '4px 20px 20px 20px',
                            border: '1px solid rgba(255,255,255,0.06)',
                          }}>
                            <TypingDots />
                          </div>
                        </motion.div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Suggestion Chips */}
                    <div style={{ 
                      padding: '8px 14px', 
                      background: 'rgba(0,0,0,0.15)', 
                      borderTop: '1px solid rgba(255,255,255,0.03)',
                      flexShrink: 0
                    }}>
                      <div style={{ 
                        display: 'flex', 
                        gap: 6, 
                        overflowX: 'auto', 
                        paddingBottom: 4,
                        scrollbarWidth: 'none',
                        WebkitOverflowScrolling: 'touch'
                      }}>
                        {CHIPS_DATA.map((chip, idx) => (
                          <button
                            key={idx}
                            onClick={() => sendMessage(chip.query)}
                            style={{
                              padding: '6px 12px',
                              borderRadius: 14,
                              background: 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              color: 'rgba(255, 255, 255, 0.75)',
                              fontSize: '0.74rem',
                              whiteSpace: 'nowrap',
                              cursor: 'pointer',
                              fontWeight: 500,
                              transition: 'all 0.2s ease',
                            }}
                            onMouseOver={e => {
                              e.currentTarget.style.background = 'rgba(74, 222, 128, 0.08)';
                              e.currentTarget.style.borderColor = 'rgba(74, 222, 128, 0.3)';
                              e.currentTarget.style.color = 'var(--bg-white)';
                            }}
                            onMouseOut={e => {
                              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                              e.currentTarget.style.color = 'rgba(255, 255, 255, 0.75)';
                            }}
                          >
                            {chip.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  /* Help Info Panel */
                  <div style={{ flex: 1, padding: 24, overflowY: 'auto', color: '#cbd5e1', fontSize: '0.86rem', lineHeight: 1.6 }}>
                    <h3 style={{ color: 'var(--bg-white)', fontSize: '1.1rem', fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <HelpCircle size={18} style={{ color: 'var(--secondary)' }} />
                      About Infinity-AI
                    </h3>
                    <p style={{ marginBottom: 14 }}>
                      This AI assistant is configured to act as a virtual representative for **Infinity Construction Pvt. Ltd.** It has direct access to the website database and blogs.
                    </p>
                    
                    <h4 style={{ color: 'var(--bg-white)', fontWeight: 600, marginTop: 16, marginBottom: 8 }}>🧠 Synced Content Base:</h4>
                    <ul style={{ paddingLeft: 16, display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 16 }}>
                      <li>📁 **Company Profile:** Found year, CEO Shreedhar Chalise, projects.</li>
                      <li>🏗️ **Services:** Audits, building works, interior, drawings.</li>
                      <li>💰 **Construction Rates:** Sqft pricing tables for Kathmandu Valley.</li>
                      <li>🏠 **Earthquake Safety:** Columns, foundations, and NBC standards.</li>
                      <li>📰 **Blogs:** Complete summaries of all published guides.</li>
                    </ul>

                    <h4 style={{ color: 'var(--bg-white)', fontWeight: 600, marginTop: 16, marginBottom: 8 }}>⚡ Local Search Index:</h4>
                    <p style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      If OpenAI or Gemini keys are not configured in your environment, Infinity-AI runs an advanced text search parser client-side. It parses your query context and renders formatted text, tables, and internal page links.
                    </p>
                    
                    <button 
                      onClick={() => setActiveTab('chat')}
                      style={{
                        marginTop: 24,
                        padding: '8px 16px',
                        background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                        color: 'var(--bg-white)',
                        border: 'none',
                        borderRadius: 8,
                        fontWeight: 600,
                        cursor: 'pointer',
                        width: '100%'
                      }}
                    >
                      Back to Chat
                    </button>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                background: '#16172e', padding: '14px 18px', flexShrink: 0,
              }}>
                <form onSubmit={handleSend} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <input
                    ref={inputRef}
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    placeholder="Ask about cost, plans, earthquake NBC rules..."
                    disabled={isTyping || activeTab === 'help'}
                    style={{
                      flex: 1, padding: '10px 18px', borderRadius: 24,
                      border: '1px solid rgba(255,255,255,0.12)', outline: 'none',
                      fontSize: '0.88rem',
                      background: 'rgba(255,255,255,0.04)',
                      color: 'var(--bg-white)', transition: 'all 0.25s ease',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = 'rgba(74, 222, 128, 0.5)';
                      e.target.style.boxShadow = '0 0 10px rgba(74, 222, 128, 0.15)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(255,255,255,0.12)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                  <motion.button
                    whileHover={{ scale: (!isTyping && inputText.trim()) ? 1.08 : 1 }}
                    whileTap={{ scale: (!isTyping && inputText.trim()) ? 0.94 : 1 }}
                    type="submit"
                    disabled={isTyping || !inputText.trim() || activeTab === 'help'}
                    style={{
                      width: 42, height: 42, borderRadius: '50%', border: 'none',
                      background: (isTyping || !inputText.trim() || activeTab === 'help')
                        ? 'rgba(255,255,255,0.05)'
                        : 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
                      color: (isTyping || !inputText.trim() || activeTab === 'help') ? 'rgba(255,255,255,0.2)' : 'white', 
                      display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      cursor: (isTyping || !inputText.trim() || activeTab === 'help') ? 'not-allowed' : 'pointer',
                      flexShrink: 0, transition: 'all 0.25s ease',
                      border: '1px solid rgba(255,255,255,0.08)',
                      boxShadow: (isTyping || !inputText.trim() || activeTab === 'help') ? 'none' : '0 4px 14px rgba(0, 144, 76, 0.25)',
                    }}
                  >
                    <Send size={15} />
                  </motion.button>
                </form>
                <div style={{ 
                  fontSize: '0.66rem', 
                  color: 'rgba(255,255,255,0.3)', 
                  textAlign: 'center', 
                  marginTop: 8,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 4
                }}>
                  {gemini ? (
                    <>
                      <Sparkles size={10} style={{ color: 'var(--secondary)' }} />
                      Gemini Core Connected
                    </>
                  ) : openai ? (
                    <>
                      <Sparkles size={10} style={{ color: 'var(--secondary)' }} />
                      GPT Support Connected
                    </>
                  ) : (
                    <>
                      <Database size={10} style={{ color: '#cbd5e1' }} />
                      Running on Local Web Database
                    </>
                  )}
                  · Infinity Construct Pvt. Ltd.
                </div>
              </div>

            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Floating Toggle Button ── */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div style={{ position: 'relative', display: 'inline-block' }}>
              {/* Outer pulsing rings */}
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.35, 0, 0.35] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  position: 'absolute', inset: -4, borderRadius: '50%',
                  background: 'rgba(0,144,76,0.3)', zIndex: -1,
                  filter: 'blur(4px)'
                }}
              />
              <motion.div
                animate={{ scale: [1, 1.6, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                style={{
                  position: 'absolute', inset: -8, borderRadius: '50%',
                  background: 'rgba(48,51,135,0.2)', zIndex: -2,
                  filter: 'blur(6px)'
                }}
              />
              <motion.button
                className="chat-widget-btn"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                onClick={() => setIsOpen(true)}
                style={{
                  borderRadius: '50%', border: '1px solid rgba(255,255,255,0.12)',
                  background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                  color: 'var(--bg-white)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(48,51,135,0.45), 0 0 15px rgba(0,144,76,0.3)',
                  position: 'relative',
                }}
              >
                <Bot size={28} />
                
                {/* Active pulse dot */}
                <motion.div
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                  style={{
                    position: 'absolute', top: 3, right: 3,
                    width: 14, height: 14, borderRadius: '50%',
                    background: '#22c55e', border: '2.5px solid #0d0e1c',
                    boxShadow: '0 0 6px #22c55e'
                  }}
                />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default ChatWidget;
