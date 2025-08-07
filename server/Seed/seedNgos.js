const mongoose = require("mongoose");
const Ngo = require("../models/Ngo");
require("dotenv").config();

const ngoList = [
  {
    name: "India Justice Foundation",
    city: "Delhi",
    category: "Legal Aid",
    description: "Free legal help for underprivileged citizens.",
    address: "Connaught Place, Delhi",
    phone: "9876543210",
    email: "contact@justicefoundation.org",
    website: "http://justicefoundation.org"
  },
  {
    name: "Women Legal Support Group",
    city: "Mumbai",
    category: "Women Safety",
    description: "Helping women facing abuse and harassment.",
    address: "Andheri East, Mumbai",
    phone: "9988776655",
    email: "support@wlsg.org",
    website: "http://wlsg.org"
  },
  {
    name: "HelpAge India",
    city: "Delhi",
    category: "Elderly Care",
    description: "Supporting the elderly in India since 1978." ,
    address: "CP, Delhi",
    phone: "011-43532000",
    email: "info@helpageindia.org",
    website: "https://www.helpageindia.org"
  },
  {
    name: "PETA India",
    city: "Mumbai",
    category: "Animal Rights",
    description: "Working to end animal cruelty in India.",
    address: "Santacruz, Mumbai",
    phone: "022-26672761",
    email: "petaindia@petaindia.org",
    website: "https://www.petaindia.com"
  },
  {
    name: "Legal Aid Trust",
    city: "Mumbai",
    category: "Legal Aid",
    description: "Promoting legal literacy and affordable legal help." ,
    address: "Fort, Mumbai",
    phone: "022-12345678",
    email: "info@legalaidtrust.in",
    website: "https://legalaidtrust.in"
  },
  {
    name: "Hashiya Socio-Legal Centre for Women",
    city: "Ranchi",
    category: "Women Legal Aid",
    description: "Supports incarcerated women with legal aid & counseling.",
    address: "Hotwar, Ranchi",
    phone: "0651-1234567",
    email: "hello@hashiya.org",
    website: "http://hashiya.org"
  },
  {
    name: "Committee for Legal Aid to Poor (CLAP)",
    city: "Cuttack",
    category: "Legal Aid",
    description: "Counseling and legal training for women victims.",
    address: "Sector-6, CDA, Cuttack",
    phone: "0671-603980",
    email: "committee@dte.vsnl.net.in",
    website: "http://clap.org"
  },
  {
    name: "Azad Foundation",
    city: "Delhi",
    category: "Women Safety",
    description: "Empowers women to stay safe in the city through training.",
    address: "Rohini, Delhi",
    phone: "011-27069716",
    email: "info@azadfoundation.org",
    website: "https://azadfoundation.org"
  },
  {
    name: "Save the Children India",
    city: "New Delhi",
    category: "Child Protection",
    description: "Promotes children's rights and development.",
    address: "Rohini, New Delhi",
    phone: "011-40842000",
    email: "india@savethechildren.org",
    website: "https://www.savethechildren.in"
  },
  {
    name: "Smile Foundation",
    city: "New Delhi",
    category: "Education",
    description: "Healthcare and education for underprivileged children.",
    address: "GK, Delhi",
    phone: "011-49048181",
    email: "info@smilefoundationindia.org",
    website: "https://www.smilefoundationindia.org"
  },
  {
    name: "Women's Rights Organization",
    city: "Mumbai",
    category: "Women Empowerment",
    description: "Empowering women through legal aid and self-help initiatives.",
    address: "Dadar East, Mumbai",
    phone: "022-12345678",
    email: "contact@wro.org",
    website: "https://wro.org"
  },
  {
    name: "Justice For All",
    city: "Mumbai",
    category: "Legal Aid",
    description: "Free legal support for underprivileged communities.",
    address: "Fort Area, Mumbai",
    phone: "022-23456789",
    email: "help@justiceforall.org",
    website: "https://justiceforall.org"
  },
  {
    name: "Animal Rescue League",
    city: "Mumbai",
    category: "Animal Welfare",
    description: "Rescuing and sheltering stray and injured animals.",
    address: "Borivali West, Mumbai",
    phone: "022-34567890",
    email: "support@arl.org",
    website: "https://arlmumbai.org"
  },
  {
    name: "Hope Foundation India",
    city: "Mumbai",
    category: "Child Education",
    description: "Educating and rehabilitating street children.",
    address: "Kandivali East, Mumbai",
    phone: "022-45678901",
    email: "hope@foundation.org",
    website: "https://hopefoundation.in"
  },
  {
    name: "Elder Care India",
    city: "Mumbai",
    category: "Elderly Support",
    description: "Healthcare and legal support for senior citizens.",
    address: "Andheri West, Mumbai",
    phone: "022-56789012",
    email: "eldercare@eci.org",
    website: "https://eldercareindia.org"
  },
  {
    name: "Green Mumbai Movement",
    city: "Mumbai",
    category: "Environment",
    description: "Creating sustainable and eco-friendly urban spaces.",
    address: "Powai, Mumbai",
    phone: "022-67890123",
    email: "info@greenmumbai.org",
    website: "https://greenmumbai.org"
  },
  {
    name: "Youth Empowerment Network",
    city: "Mumbai",
    category: "Youth Development",
    description: "Skill development and leadership for underprivileged youth.",
    address: "Ghatkopar East, Mumbai",
    phone: "022-78901234",
    email: "youth@yennetwork.org",
    website: "https://yennetwork.org"
  },
  {
    name: "Legal Aid Society of Mumbai",
    city: "Mumbai",
    category: "Legal Aid",
    description: "Providing affordable and free legal services.",
    address: "Colaba, Mumbai",
    phone: "022-89012345",
    email: "contact@lasm.org",
    website: "https://lasm.org"
  },
  {
    name: "Smile India Trust",
    city: "Mumbai",
    category: "Child Welfare",
    description: "Nutrition and education for children in slums.",
    address: "Kurla East, Mumbai",
    phone: "022-90123456",
    email: "smile@india.org",
    website: "https://smileindiatrust.org"
  },
  {
    name: "Women's Justice Cell",
    city: "Mumbai",
    category: "Women Safety",
    description: "Legal defense and protection services for women.",
    address: "Wadala East, Mumbai",
    phone: "022-91234567",
    email: "justice@wjc.org",
    website: "https://womensjusticecell.org"
  },
  {
    name: "Legal Support Bihar",
    city: "Patna",
    category: "Legal Aid",
    description: "Free legal counselling and support for marginalized communities.",
    address: "Boring Road, Patna",
    phone: "0612-2547890",
    email: "support@legalaidbihar.org",
    website: "https://legalaidbihar.org"
  },
  {
    name: "Nari Chetna Kendra",
    city: "Patna",
    category: "Women Empowerment",
    description: "Working for rights, education, and justice for women in Bihar.",
    address: "Kankarbagh, Patna",
    phone: "0612-2354587",
    email: "info@nckpatna.in",
    website: "http://narichetna.org"
  },
  {
    name: "Childline India Patna",
    city: "Patna",
    category: "Child Protection",
    description: "24x7 helpline for distressed children in Bihar.",
    address: "Bailey Road, Patna",
    phone: "1098",
    email: "childlinepatna@cfi.in",
    website: "https://www.childlineindia.org"
  },
  {
    name: "Bihar Voluntary Health Association",
    city: "Patna",
    category: "Health",
    description: "Healthcare support and medical camps in rural Bihar.",
    address: "Rajbansi Nagar, Patna",
    phone: "0612-2261235",
    email: "bvha@bvha.org",
    website: "http://bvha.org"
  },
  {
    name: "Disha Gramin Vikas Manch",
    city: "Patna",
    category: "Rural Development",
    description: "Legal aid, education, and livelihoods for rural communities.",
    address: "Phulwarisharif, Patna",
    phone: "0612-2234098",
    email: "disha@ruralpatna.org",
    website: "http://dishabihar.org"
  },
    {
    name: "UP Legal Aid Society",
    city: "Lucknow",
    category: "Legal Aid",
    description: "Providing free legal assistance to economically weaker sections.",
    address: "Gomti Nagar, Lucknow",
    phone: "0522-4001234",
    email: "contact@uplegalaid.org",
    website: "https://uplegalaid.org"
  },
  {
    name: "Sakhi Samaj",
    city: "Lucknow",
    category: "Women Empowerment",
    description: "Supporting women survivors with counselling and legal aid.",
    address: "Hazratganj, Lucknow",
    phone: "0522-4005678",
    email: "info@sakhisamaj.org",
    website: "https://sakhisamaj.org"
  },
  {
    name: "Bachpan Bachao Foundation",
    city: "Lucknow",
    category: "Child Protection",
    description: "Working for rights, protection, and education of children.",
    address: "Aliganj, Lucknow",
    phone: "0522-4009012",
    email: "lucknow@bbf.org",
    website: "https://bbf.org"
  },
  {
    name: "Prerna Foundation",
    city: "Lucknow",
    category: "Healthcare",
    description: "Health camps, awareness and support for the urban poor.",
    address: "Indira Nagar, Lucknow",
    phone: "0522-4003456",
    email: "help@prerna.org",
    website: "https://preranafoundation.in"
  },
  {
    name: "Rural Upliftment Society",
    city: "Lucknow",
    category: "Rural Development",
    description: "Supports rural families with education and livelihood programs.",
    address: "Amroha Link Road, Lucknow",
    phone: "0522-4006789",
    email: "contact@ruraluplift.org",
    website: "https://ruraluplift.org"
  },
    {
    name: "Sangini Gender Resource Centre",
    city: "Bhopal",
    category: "Women Safety",
    description: "Provides legal aid, rescue and counseling to victims of gender-based violence.",
    address: "Sangini Centre, Slums of Bhopal",
    phone: "+91-755-4926158",
    email: "sanginicenter@rediffmail.com",
    website: "https://sangini.org.in"
  },
  {
    name: "SOS Children’s Village Bhopal",
    city: "Bhopal",
    category: "Child Protection",
    description: "Provides family‑based care, education & support for orphaned or abandoned children.",
    address: "Khajuri Kalan, Piplani, Bhopal‑462021",
    phone: "(0755) 2757588",
    email: "Incharge.Bhopal@soscvindia.org",
    website: "https://www.soschildrensvillages.in"
  },
  {
    name: "Aarambh",
    city: "Bhopal",
    category: "Child Welfare",
    description: "Child rights, eye health, self‑defense and family strengthening programmes.",
    address: "House No.184, Bharat Nagar, J.K. Road, Bhopal‑462022",
    phone: "+91‑9425300571",
    email: "aarambhbpl@gmail.com",
    website: "https://aarambhngo.org"
  },
  {
    name: "Udayan Care (MP Chapter)",
    city: "Bhopal",
    category: "Child Protection",
    description: "Works for Children without parental care and alternative non‑institutional care.",
    address: "Bhopal, Madhya Pradesh",
    phone: "", 
    email: "",
    website: "https://www.udayancare.org/chapterpage/madhya-pradesh"
  },
  {
    name: "Make A Difference (MAD) Bhopal",
    city: "Bhopal",
    category: "Youth Development",
    description: "Empowers children in shelter homes through volunteer‑led programmes.",
    address: "Bhopal, Madhya Pradesh",
    phone: "",
    email: "",
    website: "https://makeadiff.in/"
  },
   {
    name: "Srijan Foundation",
    city: "Ranchi",
    category: "Rural Development",
    description: "Promotes sustainable agriculture and community empowerment in rural Jharkhand.",
    address: "Flat No 202, Prithvi Homes, Dipatoli, Ranchi – 834009",
    phone: "", 
    email: "",
    website: "https://www.srijanjhk.org"
  },
  {
    name: "LEADS Ranchi",
    city: "Ranchi",
    category: "Education",
    description: "Improving quality of education in rural and tribal areas of Jharkhand.",
    address: "Ranchi, Jharkhand",
    phone: "",
    email: "",
    website: "https://www.leadsindiajh.org/"
  },
  {
    name: "Deepshikha",
    city: "Ranchi",
    category: "Disability Support",
    description: "Supports children with autism, cerebral palsy and other developmental disabilities.",
    address: "Ranchi, Jharkhand",
    phone: "",
    email: "",
    website: "https://deepshikhaindia.org/"
  },
  {
    name: "Guru Nanak Home for Handicapped Children",
    city: "Ranchi",
    category: "Child Welfare",
    description: "Provides physiotherapy, occupational therapy and rehabilitation for disabled children.",
    address: "Bariatu Road, Ranchi - 834009",
    phone: "",
    email: "",
    website: "http://www.gurunanakhome.org"
  },
  {
    name: "Association for Parivartan of Nation",
    city: "Ranchi",
    category: "Legal Aid/Education",
    description: "Awareness and advocacy for right to education in Jharkhand.",
    address: "Ranchi, Jharkhand",
    phone: "",
    email: "",
    website: "https://parivartan.org/"
  }
  // ... add 40 more NGOs from diverse cities and categories
];

const seedNgos = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    await Ngo.deleteMany();
    await Ngo.insertMany(ngoList);
    console.log("✅ 50 NGOs inserted!");
    process.exit();
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
};

seedNgos();
