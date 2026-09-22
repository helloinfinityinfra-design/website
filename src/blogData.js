// ─── Blog Data ────────────────────────────────────────────────────────────────
// All construction blog posts for Infinity Construct Pvt. Ltd.

import blogEarthquakeImg from './assets/blog_earthquake.png';
import blogInteriorImg from './assets/blog_interior.png';
import blogCostImg from './assets/blog_cost.png';
import blogMaterialsImg from './assets/blog_materials.png';
import blogRenovationImg from './assets/blog_renovation.png';

export const BLOG_POSTS = [
  {
    id: 6,
    slug: 'infinity-construction-vlog-kathmandu-inspection',
    title: 'Infinity Construction Vlog: Complete House Inspection Walkthrough',
    category: 'Vlogs',
    categoryColor: '#C88A3D',
    date: 'July 10, 2025',
    readTime: '12 min watch',
    author: 'Er. Ramesh Shrestha',
    authorRole: 'Senior Civil Engineer',
    image: blogRenovationImg,
    isVideo: true,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    excerpt: 'Watch our team of expert civil engineers perform a complete structural and safety inspection of a residential building in Kathmandu.',
    tags: ['Vlog', 'Home Inspection', 'Kathmandu', 'Engineering'],
    content: [
      {
        type: 'intro',
        text: 'Welcome to the first episode of Infinity Construction Vlogs! In this video walkthrough, our senior engineer, Er. Ramesh Shrestha, takes you on-site to inspect a newly constructed double-story residential home in Kathmandu. We check for structural cracks, foundation alignment, column strength, and plumbing/electrical compliance.',
      },
      {
        type: 'heading',
        text: 'On-Site Video Inspection Walkthrough',
      },
      {
        type: 'video',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
      {
        type: 'heading',
        text: 'Key Areas Checked During Inspection',
      },
      {
        type: 'list',
        items: [
          '🧱 **Column & Beam Testing** — Verifying structural integrity and checking for hairline fractures or honeycombing.',
          '📐 **Level & Alignment Checks** — Ensuring foundation slab and walls are perfectly level.',
          '💦 **Dampness & Seepage Detection** — Using specialized damp meters to detect internal wall leaks.',
          '⚡ **Electrical Safety Audit** — Inspecting distribution boards, grounding wires, and short-circuit hazards.',
        ],
      },
      {
        type: 'conclusion',
        text: 'A proper home inspection before buying or moving in can save you millions in future repair costs. Stay tuned for our next vlog where we cover earthquake resistance testing live from our lab!',
      },
    ],
  },
  {
    id: 1,
    slug: 'earthquake-resistant-construction-nepal',
    title: 'Building Earthquake-Resistant Homes in Nepal: A Complete Guide',
    category: 'Structural Engineering',
    categoryColor: '#1C2421',
    date: 'June 15, 2025',
    readTime: '8 min read',
    author: 'Er. Ramesh Shrestha',
    authorRole: 'Senior Civil Engineer',
    image: blogEarthquakeImg,
    excerpt: 'Nepal sits in one of the world\'s most seismically active zones. Learn how modern NBC-compliant construction techniques keep your family safe.',
    tags: ['Earthquake Safety', 'NBC', 'RCC', 'Foundation'],
    content: [
      {
        type: 'intro',
        text: 'Nepal experienced the devastating 2015 Gorkha earthquake that claimed over 9,000 lives and destroyed hundreds of thousands of structures. Since then, earthquake-resistant construction following the Nepal Building Code (NBC) has become not just a legal requirement — it\'s a moral responsibility. At Infinity Construct Pvt. Ltd., every project we build is designed to withstand Nepal\'s seismic forces.',
      },
      {
        type: 'heading',
        text: 'Why Earthquake-Resistant Design Matters',
      },
      {
        type: 'text',
        text: 'Nepal lies at the boundary of the Indian and Eurasian tectonic plates. This makes the Kathmandu Valley one of the highest seismic risk zones in the world. Traditional brick-and-mud construction, while beautiful, cannot withstand major seismic events. Modern RCC (Reinforced Cement Concrete) construction, when properly designed and executed, provides dramatically better protection.',
      },
      {
        type: 'heading',
        text: 'Key Elements of Earthquake-Resistant Construction',
      },
      {
        type: 'list',
        items: [
          '🏗️ **Deep RCC Foundation** — Minimum 4–5 feet below natural ground level with proper reinforcement',
          '⚙️ **Column-Beam Frame Structure** — RCC frame carries seismic loads; walls are just infill',
          '🔩 **Proper Steel Reinforcement** — TMT bars with correct diameter, spacing, and stirrups',
          '📐 **Symmetric Building Plan** — Avoids torsional forces during earthquakes',
          '🚫 **No Soft Story** — Ground floor should not be significantly weaker than upper floors',
          '🔗 **Band Beams** — Horizontal beams at window/door levels tie the structure together',
          '✅ **Quality Concrete Mix** — Minimum M20 grade (1:1.5:3 ratio) for structural members',
        ],
      },
      {
        type: 'heading',
        text: 'Nepal Building Code (NBC) Requirements',
      },
      {
        type: 'text',
        text: 'The NBC classifies Nepal into seismic zones and prescribes minimum design requirements. Key NBC standards our projects follow include NBC 105 (Seismic Design of Buildings), NBC 202 (Plain and Reinforced Concrete), and NBC 203 (RCC Framed Buildings). All our structural drawings are prepared by OCR-registered engineers and submitted for municipal approval.',
      },
      {
        type: 'heading',
        text: 'Common Mistakes to Avoid',
      },
      {
        type: 'list',
        items: [
          '❌ Reducing column size to save cost',
          '❌ Using less reinforcement than specified',
          '❌ Poor concrete mixing (adding too much water)',
          '❌ Skipping proper curing (minimum 14 days)',
          '❌ Cutting corners on foundation depth',
          '❌ Irregular building shapes with abrupt changes',
        ],
      },
      {
        type: 'callout',
        text: '💡 Pro Tip: Always hire an OCR-registered civil engineer to supervise your construction. A good engineer on-site can prevent costly and dangerous mistakes.',
      },
      {
        type: 'heading',
        text: 'Cost of Earthquake-Resistant Construction',
      },
      {
        type: 'text',
        text: 'Many people worry that earthquake-resistant construction costs significantly more. In reality, the difference is only 10–15% over conventional construction — a small price for the protection it provides. The cost difference comes mainly from proper reinforcement and quality concrete. Infinity Construct Pvt. Ltd. builds all homes to NBC standards as a baseline — it\'s non-negotiable for us.',
      },
      {
        type: 'conclusion',
        text: 'Building earthquake-resistant is building for the future of Nepal. Whether you\'re constructing a new home or renovating an existing structure, prioritize seismic safety. Our team of engineers is ready to help you design a home that stands strong — not just for you, but for generations to come.',
      },
    ],
  },
  {
    id: 2,
    slug: 'modern-interior-design-trends-nepal-2025',
    title: 'Modern Interior Design Trends for Nepali Homes in 2025',
    category: 'Interior Design',
    categoryColor: '#C88A3D',
    date: 'May 28, 2025',
    readTime: '6 min read',
    author: 'Ar. Priya Maharjan',
    authorRole: 'Lead Interior Designer',
    image: blogInteriorImg,
    excerpt: 'Discover the top interior design trends transforming Kathmandu homes in 2025 — from biophilic design to smart home integration.',
    tags: ['Interior Design', 'Home Decor', 'Modern Living', '2025 Trends'],
    content: [
      {
        type: 'intro',
        text: 'The interior design landscape in Nepal has evolved dramatically over the past decade. Kathmandu\'s homeowners are no longer satisfied with generic designs — they want spaces that reflect their personality while embracing global trends. At Infinity Construct, our interior design team has identified the top trends shaping Nepali homes in 2025.',
      },
      {
        type: 'heading',
        text: '1. Biophilic Design — Bringing Nature Indoors',
      },
      {
        type: 'text',
        text: 'The most dominant trend of 2025 is biophilic design — the integration of natural elements into interior spaces. This includes living plant walls, natural wood surfaces, stone accents, and maximizing natural light. In Kathmandu\'s busy urban environment, creating a natural sanctuary within your home provides tremendous psychological benefits.',
      },
      {
        type: 'list',
        items: [
          '🌿 Indoor vertical gardens and plant shelves',
          '🪵 Reclaimed wood feature walls and furniture',
          '🪨 Natural stone countertops and accent walls',
          '☀️ Skylights and floor-to-ceiling windows',
          '💧 Indoor water features and fountains',
        ],
      },
      {
        type: 'heading',
        text: '2. Nepali-Modern Fusion Style',
      },
      {
        type: 'text',
        text: 'There\'s a growing appreciation for incorporating traditional Nepali design elements into modern spaces. Think intricate wood carvings as wall art, traditional Dhaka fabric upholstery on modern furniture, and Newari architectural patterns rendered in modern materials. This fusion creates spaces that feel rooted in culture yet thoroughly contemporary.',
      },
      {
        type: 'heading',
        text: '3. Smart Home Integration',
      },
      {
        type: 'text',
        text: 'Smart home technology is becoming mainstream in Kathmandu\'s new constructions. Automated lighting systems, smart curtains, voice-controlled appliances, and integrated home security are becoming standard requests. When planning your interior, wiring and infrastructure for smart systems should be planned from the construction stage.',
      },
      {
        type: 'list',
        items: [
          '💡 Smart LED lighting with app control',
          '🌡️ Automated temperature control',
          '📱 Integrated security cameras and video doorbells',
          '🔌 USB and wireless charging built into furniture',
          '🔊 Built-in speaker systems in false ceilings',
        ],
      },
      {
        type: 'heading',
        text: '4. Modular Kitchen Design',
      },
      {
        type: 'text',
        text: 'The Nepali kitchen is transforming from a purely functional space to the heart of the home. L-shaped and U-shaped modular kitchens with quartz countertops, pull-out drawers, built-in appliances, and under-cabinet lighting are in high demand. Island kitchens with breakfast bars are especially popular in larger apartments.',
      },
      {
        type: 'callout',
        text: '💡 Design Tip: Choose kitchen cabinet colors in 2025\'s trending palettes — sage green, warm terracotta, and classic matte white are all excellent choices for Nepal\'s climate and lighting.',
      },
      {
        type: 'heading',
        text: '5. Multifunctional Spaces',
      },
      {
        type: 'text',
        text: 'With Kathmandu\'s growing apartment culture, maximizing space efficiency is crucial. Murphy beds that fold into the wall, dining tables that convert to work desks, built-in storage under staircases — clever multifunctional design allows smaller homes to feel spacious and organized.',
      },
      {
        type: 'conclusion',
        text: 'Great interior design isn\'t about following every trend — it\'s about creating a space that works beautifully for your lifestyle. Our interior design team at Infinity Construct works closely with each client to blend these trends with your personal vision. Book a free design consultation today!',
      },
    ],
  },
  {
    id: 3,
    slug: 'construction-cost-guide-kathmandu-2025',
    title: 'Complete Construction Cost Guide for Kathmandu 2025',
    category: 'Cost & Planning',
    categoryColor: '#1C2421',
    date: 'May 10, 2025',
    readTime: '10 min read',
    author: 'Er. Bikash Poudel',
    authorRole: 'Project Manager',
    image: blogCostImg,
    excerpt: 'Understand real construction costs in Kathmandu — from land to handover. Includes current material rates and cost-saving strategies.',
    tags: ['Construction Cost', 'Budget Planning', 'Kathmandu', 'Estimate'],
    content: [
      {
        type: 'intro',
        text: 'One of the most common questions we receive is: "How much will it cost to build a house in Kathmandu?" The answer depends on many factors, but this comprehensive guide will give you a realistic picture of construction costs in Nepal\'s capital city for 2025.',
      },
      {
        type: 'heading',
        text: 'Construction Cost Per Square Foot (2025)',
      },
      {
        type: 'text',
        text: 'Construction costs in Kathmandu are typically measured per square foot of built-up area (BUA). Here are the current rate ranges based on construction grade:',
      },
      {
        type: 'list',
        items: [
          '🥉 **Basic Grade:** NPR 2,000–2,500/sqft — Standard bricks, local tiles, basic fittings',
          '🥈 **Standard Grade:** NPR 2,500–3,500/sqft — Mid-range tiles, branded fittings, plaster finish',
          '🥇 **Premium Grade:** NPR 3,500–5,000/sqft — Granite/marble flooring, imported fittings',
          '💎 **Luxury Grade:** NPR 5,000+/sqft — Full imported materials, smart home, custom design',
        ],
      },
      {
        type: 'heading',
        text: 'Total Project Cost Breakdown',
      },
      {
        type: 'text',
        text: 'For a typical 1,500 sqft (3-storey) standard grade home in Kathmandu:',
      },
      {
        type: 'list',
        items: [
          '🏗️ **Civil Work (Structure):** NPR 15–20 lakhs (40%)',
          '🪟 **Finishing Work:** NPR 10–15 lakhs (30%)',
          '⚡ **Electrical & Plumbing:** NPR 5–7 lakhs (15%)',
          '🎨 **Interior & Painting:** NPR 5–8 lakhs (15%)',
          '📋 **Total Estimate:** NPR 35–50 lakhs',
        ],
      },
      {
        type: 'heading',
        text: 'Current Material Rates in Kathmandu (2025)',
      },
      {
        type: 'list',
        items: [
          '🧱 **Cement (50kg bag):** NPR 850–950 (Shivam, Hetauda brands)',
          '⚙️ **TMT Steel (per quintal):** NPR 9,500–11,000 (Jagdamba, Himal)',
          '🪨 **Sand (per cubic meter):** NPR 2,500–3,500',
          '🪵 **Aggregate (per cubic meter):** NPR 2,000–3,000',
          '🧱 **Machine Bricks (per 1000):** NPR 12,000–16,000',
          '🪵 **Sal Wood (per cubic ft):** NPR 250–400',
        ],
      },
      {
        type: 'heading',
        text: 'Hidden Costs Many People Forget',
      },
      {
        type: 'list',
        items: [
          '📋 **Municipality Permit:** NPR 50,000–2,00,000 depending on size',
          '🔌 **NEA Connection:** NPR 20,000–50,000',
          '💧 **Water Connection (KUKL):** NPR 15,000–30,000',
          '🏗️ **Soil Testing:** NPR 15,000–25,000',
          '📐 **Architectural Drawings:** NPR 20,000–60,000',
          '🛡️ **Structural Engineering:** NPR 15,000–40,000',
          '🚛 **Material Transport:** 5–10% of material cost',
        ],
      },
      {
        type: 'callout',
        text: '💡 Money-Saving Tip: Buy materials in bulk at the start of construction to lock in current prices. Material costs in Nepal typically increase 5–10% annually.',
      },
      {
        type: 'heading',
        text: 'How to Get an Accurate Estimate',
      },
      {
        type: 'text',
        text: 'The best way to get an accurate cost estimate for your project is a detailed Bill of Quantities (BOQ) prepared by a qualified engineer. This itemizes every material and labor cost. At Infinity Construct, we provide a free detailed estimate after our initial site visit and requirement discussion.',
      },
      {
        type: 'conclusion',
        text: 'Construction is a major investment — plan carefully and don\'t cut corners on quality. A well-built home is an asset that appreciates over time. Contact us for a free, no-obligation cost estimate for your project.',
      },
    ],
  },
  {
    id: 4,
    slug: 'choosing-right-construction-materials-nepal',
    title: 'How to Choose the Right Construction Materials in Nepal',
    category: 'Materials & Quality',
    categoryColor: '#C88A3D',
    date: 'April 22, 2025',
    readTime: '7 min read',
    author: 'Er. Ramesh Shrestha',
    authorRole: 'Senior Civil Engineer',
    image: blogMaterialsImg,
    excerpt: 'Quality materials are the backbone of a durable building. Learn which brands and grades to choose for construction in Nepal\'s climate.',
    tags: ['Construction Materials', 'Quality', 'Cement', 'Steel', 'Nepal'],
    content: [
      {
        type: 'intro',
        text: 'The quality of your building is only as good as the materials used to build it. In Nepal\'s demanding climate — with hot summers, monsoon rains, and seismic activity — choosing the right materials is critical. This guide helps you understand which materials to choose and why.',
      },
      {
        type: 'heading',
        text: 'Cement: The Foundation of Quality',
      },
      {
        type: 'text',
        text: 'Cement is the most critical binding material in construction. In Nepal, several brands are available with varying quality levels:',
      },
      {
        type: 'list',
        items: [
          '⭐⭐⭐ **Premium:** Ultratech, Ambuja (Indian brands) — highest strength, ideal for structural work',
          '⭐⭐⭐ **Premium Local:** Shivam Cement — Nepal\'s top local brand, OCR certified',
          '⭐⭐ **Standard:** Hetauda Cement — good quality, widely available',
          '⭐⭐ **Standard:** Udayapur Cement — reliable for general construction',
          '❌ **Avoid:** Unknown or uncertified brands — risk of substandard quality',
        ],
      },
      {
        type: 'callout',
        text: '⚠️ Warning: Always check the manufacturing date on cement bags. Cement older than 3 months loses significant strength. Never use cement that has hardened in the bag.',
      },
      {
        type: 'heading',
        text: 'Steel Reinforcement (TMT Bars)',
      },
      {
        type: 'text',
        text: 'Thermo-Mechanically Treated (TMT) bars are essential for RCC construction. Choose Fe500D or Fe550D grade for structural work — the "D" designation means higher ductility, which is crucial for earthquake resistance.',
      },
      {
        type: 'list',
        items: [
          '✅ **Recommended:** Jagdamba Steel — Nepal\'s largest steel manufacturer',
          '✅ **Recommended:** Himal Iron & Steel — consistent quality, widely available',
          '✅ **Recommended:** Panchakanya Steel — reliable local brand',
          '⚠️ **Caution:** Always request IS:1786 certification',
          '❌ **Avoid:** Uncertified or visibly rusted bars',
        ],
      },
      {
        type: 'heading',
        text: 'Sand and Aggregate',
      },
      {
        type: 'text',
        text: 'Sand and aggregates must be clean, well-graded, and free from organic matter. In Kathmandu, river sand from the Bagmati, Bishnumati, or Koshi rivers is commonly used. Machine-crushed stone aggregate (12mm and 20mm) is preferred over river-collected aggregate for consistency.',
      },
      {
        type: 'list',
        items: [
          '✅ Use washed river sand (free from silt and clay)',
          '✅ Request sieve analysis test certificates for large projects',
          '✅ Machine-crushed aggregate preferred for structural concrete',
          '❌ Avoid sand with excessive silt content (fails the silt test)',
          '❌ Never use sea sand in construction (chloride damage)',
        ],
      },
      {
        type: 'heading',
        text: 'Bricks: Machine vs Traditional',
      },
      {
        type: 'text',
        text: 'Modern machine-pressed bricks are superior to traditional hand-made bricks in terms of uniformity, strength, and water absorption. For important walls (exterior, ground floor), use high-quality machine bricks with minimum compressive strength of 35 kg/cm². Traditional bricks can be used for interior, non-load-bearing partitions.',
      },
      {
        type: 'heading',
        text: 'Door and Window Frames',
      },
      {
        type: 'list',
        items: [
          '🪵 **Sal Wood (Shorea robusta):** Nepal\'s best hardwood, very durable, termite-resistant',
          '🪵 **Teak:** Premium choice, excellent weather resistance, expensive',
          '🪟 **Aluminium Frames:** Low maintenance, weather-proof, modern look',
          '🪟 **uPVC Frames:** Excellent insulation, moisture-proof, ideal for bathrooms',
          '❌ **Avoid:** Unknown wood species or treated wood with poor certification',
        ],
      },
      {
        type: 'conclusion',
        text: 'Investing in quality materials upfront saves money in the long run by reducing maintenance, repairs, and the risk of structural failure. At Infinity Construct, we have established relationships with Nepal\'s top material suppliers and pass those benefits to our clients through quality assurance and competitive pricing.',
      },
    ],
  },
  {
    id: 5,
    slug: 'home-renovation-guide-nepal',
    title: 'The Ultimate Home Renovation Guide for Nepal Homeowners',
    category: 'Renovation',
    categoryColor: '#1C2421',
    date: 'April 5, 2025',
    readTime: '9 min read',
    author: 'Ar. Priya Maharjan',
    authorRole: 'Lead Interior Designer',
    image: blogRenovationImg,
    excerpt: 'Planning a home renovation in Nepal? This step-by-step guide covers everything from planning and budgeting to execution and common pitfalls.',
    tags: ['Renovation', 'Home Improvement', 'Remodeling', 'Nepal Homes'],
    content: [
      {
        type: 'intro',
        text: 'Renovating your home is one of the most rewarding investments you can make. Whether you\'re updating an aging property, adding modern amenities, or completely transforming your living space, a well-planned renovation adds value, comfort, and joy to your home. This guide walks you through the renovation process specific to Nepal\'s context.',
      },
      {
        type: 'heading',
        text: 'Step 1: Define Your Renovation Goals',
      },
      {
        type: 'text',
        text: 'Before calling any contractor, clearly define what you want to achieve. Are you renovating for your own comfort, to increase resale value, or to fix structural issues? Prioritize your goals because budget constraints usually mean making choices between competing wishes.',
      },
      {
        type: 'list',
        items: [
          '🎯 Structural repairs (cracks, leaks, waterproofing)',
          '🎯 Kitchen and bathroom upgrades',
          '🎯 Additional rooms or floor extension',
          '🎯 Electrical rewiring and plumbing update',
          '🎯 Complete interior redesign',
          '🎯 Exterior cladding and façade update',
        ],
      },
      {
        type: 'heading',
        text: 'Step 2: Set a Realistic Budget',
      },
      {
        type: 'text',
        text: 'Renovation costs in Nepal vary widely depending on scope. As a rough guide: minor renovations (painting, flooring) cost NPR 2–5 lakhs; moderate renovations (kitchen, bathroom) cost NPR 5–15 lakhs; major renovations (structural changes, full interior) cost NPR 15–40+ lakhs. Always add 15–20% contingency to your budget for unexpected discoveries.',
      },
      {
        type: 'callout',
        text: '💡 Budget Tip: Renovating one room at a time allows you to spread costs and continue living in your home. Full-home renovation requires temporary accommodation — budget for this too.',
      },
      {
        type: 'heading',
        text: 'Step 3: Structural Assessment First',
      },
      {
        type: 'text',
        text: 'Before any cosmetic work, assess structural integrity — especially in older Kathmandu homes. Common structural issues include: hairline cracks (may indicate settling), water infiltration through walls/roof, corroded steel in exposed locations, and damaged foundation. These must be fixed before any interior work begins.',
      },
      {
        type: 'heading',
        text: 'Step 4: The Renovation Sequence Matters',
      },
      {
        type: 'text',
        text: 'Always work in the right sequence to avoid redoing work:',
      },
      {
        type: 'list',
        items: [
          '1️⃣ Structural repairs and modifications',
          '2️⃣ Electrical rewiring and new points',
          '3️⃣ Plumbing — pipes and drainage',
          '4️⃣ Waterproofing (bathrooms, terrace, basement)',
          '5️⃣ Plastering walls',
          '6️⃣ Flooring installation',
          '7️⃣ Bathroom and kitchen fittings',
          '8️⃣ Door and window installation/replacement',
          '9️⃣ Painting and wall treatments',
          '🔟 Final furniture and décor',
        ],
      },
      {
        type: 'heading',
        text: 'Common Renovation Mistakes in Nepal',
      },
      {
        type: 'list',
        items: [
          '❌ Choosing the cheapest contractor without verifying quality',
          '❌ Skipping waterproofing to save money (costs 10x more to fix later)',
          '❌ Not getting a written contract with payment milestones',
          '❌ Ignoring electrical load calculation for new appliances',
          '❌ Starting work without municipality approval for structural changes',
          '❌ Rushing the project — quality work takes time',
        ],
      },
      {
        type: 'heading',
        text: 'Choosing the Right Renovation Contractor',
      },
      {
        type: 'text',
        text: 'Look for a contractor who provides a detailed written quote, has verifiable past projects, employs qualified supervisors, and is willing to use quality materials you specify. Ask for references from past clients and actually call them. A good contractor will never pressure you to decide immediately.',
      },
      {
        type: 'conclusion',
        text: 'A successful renovation transforms not just your home, but your quality of life. At Infinity Construct, we handle renovations of all scales — from single bathroom upgrades to complete home makeovers. Contact us for a free site visit and renovation assessment.',
      },
    ],
  },
];

export default BLOG_POSTS;
