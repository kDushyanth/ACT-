const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const model_info = require('./models/Model');
const connectDB = require('./config/db');
dotenv.config({path : './config/config.env'});


var topic2=["BASIC PRINCIPLES OF AQUACULTURE","BIOLOGY OF FIN FISH & SHELL FISH","FISH NUTRITION AND FEED TECHNOLOGY","FRESHWATER & BRACKISHWATER AQUACULTURE","FISH HEALTH MANAGEMENT","FISHERIES EXTENSION, ECONOMICS & MARKETING","ORNAMENTAL FISHERY","FISH PROCESSING TECHNOLOGY","FISHERY MICROBIOLOGY AND FISHERY BY-PRODUCTS","QUALITY CONTROL IN PROCESSING PLANTS"];
var units=["INTRODUCTION","POND ECOSYSTEM ","TYPES OF FISH PONDS ","POND PREPARATION ","POND MANAGEMENT FACTORS ","-1",
"GENERAL CHARACTERS & CLASSIFICATION OF CULTIVABLE FIN & SHELL FISH",
"FOOD AND FEEDING",
"DIGESTION, RESPIRATION AND CIRCULATION",
"REPRODUCTIVE BIOLOGY & DEVELOPMENT",
"HORMONES",
"PRACTICALS",
"-1",
"NUTRITIONAL REQUIREMENTS OF CULTIVABLE FISH",
"FORMS OF FEEDS & FEEDING METHODS",
"FEED MANUFACTURE & STORAGE",
"FEED ADDITIVES & NON-NUTRIENT INGREDIENTS",
"NUTRITIONAL DEFICIENCY IN CULTIVABLE FISH",
"PRACTICALS",
"-1",
"INTRODUCTION TO FRESHWATER AQUACULTURE",
"CARP CULTURE",
"CULTURE OF AIR-BREATHING AND COLD WATER FISH",
"CULTURE OF PRAWN",
"CULTURE OF BRACKISHWATER SPECIES",
"PRACTICALS",
"-1",
"PATHOLOGY AND PARASITOLOGY",
"DISEASES OF FIN FISH",
"DISEASES OF SHELL FISH",
"NUTRITIONAL DISEASES",
"FISH HEALTH MANAGEMENT",
"PRACTICALS",
"-1",
"INTRODUCTION",
"FISHERIES MARKETING",
"FISHERIES CONOMICS",
"FISHERIES EXTENSION",
"TRANSFER OF TECHNOLOGY",
"PRACTICALS",
"-1",
"INTRODUCTION",
"IMPORTANT ORNAMENTAL FISH & PLANTS",
"FABRICATION AND SETTING UP OF AQUARIUMS",
"AQUARIUM MANAGEMENT",
"COMMERCIAL PRODUCTION OF AQUARIUM FISH AND PLANTS",
"PRACTICALS",
"-1",
"INTRODUCTION",
"FREEZING AND CANNING",
"DRYING, SMOKING AND FREEZE-DRYING",
"PACKING, COLD STORAGE AND EXPORT OF FISHERY PRODUCTS",
"EXPORT OF FISHERY PRODUCTS FROM INDIA",
"PRACTICALS",
"-1",
"INTRODUCTION",
"AQUATIC MICROBIOLOGY",
"FISH MICROBIOLOGY",
"FISHERY BY-PRODUCTS",
"VALUE ADDED PRODUCTS",
"PRACTICALS",
"-1",
"UNIT 1",
"UNIT 2",
"UNIT 3",
"UNIT 4",
"UNIT 5",
"PRACTICALS"
];
var subunits=["Concept of Blue Revolution - History and definition of Aquaculture ",
"Scope of Aquaculture at global Level, India and Andhra Pradesh ",
 "Fresh water aquaculture, brackish water aquaculture and mariculture ",
 "Different Aquaculture systems – Pond, Cage, Pen, Running water, Extensive, Intensive and & Semi-Intensive Systems and their significance. Monoculture, Polyculture and Monosex culture systems ",
 "Aquaculture versus Agriculture; Present day needs with special reference to Andhra Pradesh" ,"-1",
 "General Concepts of Ecology, Food Chains ",
 "Lotic and lentic systems, streams and springs" ,
 "Nutrient Cycles in Culture Ponds – Phosphorus, Carbon and Nitrogen",
 "Importance of Plankton and Benthos in culture ponds and algal blooms",
"-1",
"Classification of ponds based on water resources – spring, rain water, flood water, well water and water course ponds",
"Functional classification of ponds – head pond, hatchery, nursery, rearing, production, stocking and quarantine ponds ",
"Hatchery design ",
"-1",
"Important factors in the construction of an ideal fish pond – site selection, topography, nature of the soil, water resources ",
"Lay out and arrangements of ponds in a fish farm ",
"Construction of an ideal fish pond – space allocation, structure and components of barrage pond ",
"-1",
"Need of fertilizer and manure application in culture ponds; Role of nutrients; NPK contents of different fertilizers and manures used in aquaculture; and precautions in their application",
"Physico-chemical conditions of soil and water optimum for culture –temperature, depth, turbidity, light, water and shore currents, PH, DOD, CO2 and nutrients; measures to increase oxygen and reduce ammonia & hydrogen sulphide in culture ponds; correction of PH",
"Eradication of predators and weed control – advantages and disadvantages of weed, weed plants in culture ponds, aquatic weeds, weed fish, toxins used for weed control and control of predators","-1",
"Estimation of Carbonates, Bicarbonates in water samples",
"Estimation of Chlorides in water samples",
"Estimation of dissolved oxygen",
"Estimation of ammonia in water",
"Field visit to nursery, rearing and stocking ponds of aqua farms",
"Field visit to hatchery",
"Study of algal blooms and their control",
"Collection & identification of zooplankton and phytoplankton",
"Study of aeration devices",
"Determination of soil nitrogen and phosphorus",
"Collection and study of aquatic weeds",
"Filed survey of nearby habitat for dietary dependency on and requirement of aquaproducts",
"-1",
"General Characters and classification of fishes up to the level of Class.",
"General Characters and classification of crustaceans up to the level of Class.",
"General Characters and classification of molluscs up to the level of Class.",
"Economic importance of Fishes, Crustaceans and Molluscans",
"-1",
"Natural fish food,",
"Food and feeding habits of fishes and prawns.",
"Factors influencing feeding",
"-1",
"Digestive system –Digestive system and process of digestion in fishes and prawns.",
"Respiratory system – Types of gills, Structure of gill, mechanism of gill respiration.",
"Cardiovascular system – General features of heart and physiology of circulation,",
"-1",
"Reproductive system of Fishes and prawns.",
"Embryonic and larval development of fishes and prawns",
"Parental care in fishes, ovo-viviparity, oviparity, viviparity.","-1",
"Pituitary gland,hormones",
"Thyroid gland, hormones",
"Gonads",
"Adrenal gland",
"-1",
"Comparative study of digestive system of herbivorous and carnivorous fishes",
"Length-weight relationship of fishes",
"Gut content analysis in fishes and shrimp",
"Mouth parts and appendages of cultivable prawns, shrimps and other crustaceans",
"Study of eggs of fishes, shrimps, prawns and other crustaceans",
"Embryonic and larval development of fish",
"Study of gonadal maturity and fecundity in fishes and shellfish",
"Observation of crustacean larvae",
"Observation of molluscan larvae",
"Study of nest building and brooding of fishes",
"-1",
"Requirements for energy, proteins, carbohydrates, lipids, fiber, micronutrients for different stages of cultivable fish and prawns",
"Essential aminoacids and fatty acids, protein to energy ratio, nutrient interactions and protein sparing effect",
"Dietary sources of energy, effect of ration on growth, determination of feeding rate, check tray",
"Factors affecting energy partitioning and feeding","-1",
"Fed conversion efficiency, feed conversion ratio and protein efficiency ratio",
"Wet feeds, moist feeds, dry feeds, mashes, pelleted feeds, floating and sinking pellets, advantages of pelletization",
"Manual feeding, demand feeders, automatic feeders, surface spraying, bag feeding and tray feeding",
"Frequency of feeding","-1",
"Feed ingredients and their selection, nutrient composition and nutrient availability of feed ingredients",
"Feed formulation – extrusion processing and steam pelleting, grinding, mixing and drying, pelletization, and packing",
"Water stability of feeds, farm made aqua feeds, micro-coated feeds, micro-encapsulated feeds and micro-bound diets",
"Microbial, insect and rodent damage of feed, chemical spoilage during storage period and proper storage methods",
"-1",
"Binders, anti-oxidants, probiotics",
"Feed attractants and feed stimulants",
"Enzymes, hormones, growth promoters and pigments",
"Anti-metabolites, afflatoxins and fiber",
"-1",
"Protein deficiency, vitamin and mineral deficiency symptoms",
"Nutritional pathology and ant-nutrients",
"Importance of natural and supplementary feeds, balanced diet","-1",
"Estimation of protein content in aquaculture feeds",
"Estimation of carbohydrate content in aquaculture feeds",
"Estimation of lipid content in aquaculture feeds",
"Estimation of ash in aquaculture feed",
"Study of water stability of pellet feeds",
"Feed formulation and preparation in the lab",
"Study of binders used in aquaculture feeds",
"Study of feed packing materials",
"Study of physical and chemical change during storage",
"Study on physical characteristics of floating and sinking feeds",
"Visit to a aqua-feed production unit",
"Visit to a farm for studying feeding practices",
"-1",
"Status, scope and prospects of fresh water aquaculture in the world, India and AP",
"Different fresh water aquaculture systems",
"Water stability of feeds, farm made aqua feeds, micro-coated feeds, micro-encapsulated feeds and micro-bound diets",
"Microbial, insect and rodent damage of feed, chemical spoilage during storage period and proper storage methods",
"-1",
"Major cultivable Indian carps – Labeo, Catla and Cirrhinus & Minor carps",
"Exotic fish species introduced to India – Tilapia, Pangassius and Clarius sp.",
"Composite fish culture system of Indian and exotic carps",
"Impact of exotic fish, Compatibility of Indian and exotic carps and competition among them",
"-1",
"Recent developments in the culture of clarius, anabas, murrels,",
"Advantages and constraints in the culture of air-breathing and cold water fishes- seed resources, feeding, management and production",
"Special systems of Aquaculture- brief study of culture in running water, re-circulatory systems, cages and pens, sewage-fed fish culture",
"-1",
"Fresh water prawns of India - commercial value",
"Macrobrachium rosenbergii– biology, seed production, pond preparation, stocking, management of nursery and grow-out ponds, feeding, mprphotypes and harvesting",
"Prawn culture systems – Pen culture, Flow through system, Recirculation system, Extensive, semi intensive and Intensive system, satellite forming.",
"-1",
"Crab culture – Culturable crabs, Culture methods(Grow-out culture and Fattening in Ponds), Site selection, pond management, harvesting, pen and cage crab culture, mixed culture.",
"Culture of L. vannamei – hatchery technology and culture practices including feed and disease management.",
"Mixed culture of fish and prawns",
"-1",
"Identification of important cultivable carps",
"Identification of important cultivable air-breathing fish",
"Identification of important cultivable fresh water prawns",
"Identification of different life history stages of fish",
"Identification of different life history stages of fresh water prawn",
"Collection and study of weed fish",
"Identification of commercially viable crabs – Scylla cerrata, Portunus pelagicus, P.sanguinolentus, Neptunus pelagicus, N. Sanguinolentus",
"Identification of lobsters – Panulirus polyphagus, P.ornatus, P.homarus, P.sewelli, P.penicillatus",
"Identification of oysters of nutritional significance – Crossostrea madrasensis, C.gryphoides, C. cucullata, C.rivularis , Picnodanta",
"Identification of mussels and clams",
"Identification of developmental stages of oysters",
"Field visit to aqua farm and study of different components like dykes etc.",
"-1",
"Introduction to fish diseases –Definition and categories of diseases – Disease and environment",
"Disturbance in cell structure – changes in cell metabolism, progressive and retrogressive tissue changes, types of degeneration, infiltration, necrosis, cell death and causes",
"Atrophy, hypertrophy, neoplasms, inflammation, healing and repair",
"-1",
"Fungal diseases (both of shell and finfish) – Saprolegniosis, brachiomycosis, ichthyophorus diseases – Lagenidium diseases – Fusarium disease, prevention and therapy",
"Viral diseases – Emerging viral diseases in fish, haemorrhagic scepticemia, spring viremia of carps, infectious hematopoietic necrosis in trout, infectious pancreatic necrosis in salmonids, swim-bladder inflammation in cyprinids, channel cat fish viral disease, prevention and therapy",
"Baterial diseases – Emerging bacterial diseases, aermonas, pseudomonas and vibrio infections, columnaris, furunculosis, epizootic ulcerative syndrome, infectious abdominal dropsy, bacterial gill disease, enteric red mouth, bacterial kidney disease, proliferative kidney disease, prevention and therapy",
"-1",
"Major shrimp viral diseases – Bacculovirus penaeii, Monodon Bacculovirus, Bacculoviral midgut necrosis, Infectious hypodermal and haematopoietic necrosis virus, Hepatopancreatic parvo like virus, Yellow head bacculovirus, white spot bacculovirus.",
"Bacterial diseases of shell fish – aeromonas, pseudomonas and vibrio infections, luminous bacterial disease, filamentous bacterial disease. Prevention and therapy",
"Protozoan diseases- Ichthyophthiriasis, Costiasis, whirling diseases, trypanosomiasis.Prevention and therapy",
"-1",
"Nutritional pathology – lipid liver degeneration, Vitamin and mineral deficiency diseases. Aflatoxin and dinoflagellates.",
"Antibiotic and chemotherapeutics. Nutritional cataract. Genetically and environmentally induced diseases.",
"-1",
"Diagnostic tools – immune detection- DNA/RNA techniques, General preventive methods and prophylaxis. Application and development of vaccines.",
"Quarantine – Significance, methods and regulations for transplants.",
"Production of disease-free seeds. Evaluation criteria of healthy seeds.",
"Good Feed management for healthy organisms, Zero water exchange, Probiotics in health management, Issues of biosecurity.",
"-1",
"Enumeration of Bacteria by TPC Method",
"Enumeration of total Coliforms",
"Observation of gross pathology and external lesions of fish and prawn with reference to the common diseases in aquaculture",
"Examination of pathological changes in gills and gut lumen, lymphoid organ, muscles and nerves of fish",
"Examination of pathological changes in gut lumen, hepatopncreas, lymphoid organ, muscles and nerves of prawn and shrimp",
"Collection, processing and analysis of data for epedemeiological investigations of viral diseases",
"Bacterial pathogens – isolation, culture and characterization",
"Identification of parasites in fishes: Protozoan, Helmiths, Crustaceans",
"Antibiograms – preparation and evaluation",
"Molecular and immunological techniques; Biochemical tests; PCR; ELISA;Agglutination test; Challenge tests; Purification of virus for development of vaccines (Demonstration at institutes/labs)",
"Estimation of dose, calculation of concentration, methods of administration of various chemotherapeutics to fish and shell fish",
"Estimation of antibiotics used in aquaculture practices",
"Estimation of probiotics used in aquaculture",
"Field visit to farm for health monitoring and disease diagnosis",
"-1",
"Meaning and scope of economics with reference to fisheries",
"Basic concepts of economics – goods, services, wants and utility, demand and supply, value price, market demand and individual demand, elasticity of demand, law of diminishing marginal utility",
"Theory of production, production function in fisheries",
"Various factors influencing the fishery product’s price",
"-1",
"Basic marketing functions, consumer behaviour and demand, fishery market survey and test marketing a product",
"Fish marketing – prices and price determination of fishes",
"Marketing institutions- primary( producer fishermen, fishermen cooperatives, and fisheries corporations) and secondary (merchant/agent/speculative middlemen)",
"Methods of economic analysis of business organizations",
"Preparation of project and project appraisal",
"-1",
"Aquaculture economics- application of economics principles to aquaculture operations",
"Various inputs and production function. Assumptions of production function in aquaculture analysis, least cost combination of inputs, laws of variable proportions",
"Cost and earnings of aquaculture systems – carp culture, shrimp farming systems, hatcheries, Cost and earnings of fishing units and freezing plants",
"Socio-economic conditions of fishermen in Andhra Pradesh, Role of Matsyafed and NABARD in uplifting fishermen’s conditions, fishermen cooperatives",
"Contribution of fisheries to the national economy",
"-1",
"Fisheries extension – scope and objectives, principles and features of fisheries extension education",
"Fisheries extension methods and rural development",
"Adoption and diffusion of innovations",
"-1",
"ICAR programs – salient features of ORP, NDS, LLP, IRDP, ITDA, KVK, FFDA, FCS, FTI, TRYSEM",
"Training – meaning, training vs. education and teaching",
"DAATT centres and their role in tot programs, video conferencing, education of farmers through print and electronic media",
"-1",
"Project work/on-job training at industry",
"-1",
"Aquarium and ornamental fishes – introduction",
"Types of Aquarium- Tropical Freshwater Aquariums, Coldwater Aquariums, Brackish Water Aquariums",
"Aquarium accessories – aerators, filters, lighters and heaters",
"-1",
"Commercially important ornamental fishes - exotic species",
"Indigenous species",
"Aquarium plants",
"-1",
"Fabrication of Aquarium- Different types of fish tanks, Materials required for construction of tank, Construction of all glass aquarium glass tank",
"Setting up of aquarium- Steps involved in setting up of aquarium",
"-1",
"Maintenance of Aquarium",
"Water quality management",
"Common diseases of aquarium fish, diagnosis and treatment",
"-1",
"Commercial production units of ornamental fish- requirements and design",
"Commercial production of gouramies, barbs, angels and tetras",
"Ornamental Aquatic Plant Culture",
"-1",
"Study of aerators – types and structures",
"Water circulation methods in aquarium and filtration",
"Collection and identification of aquarium plants",
"Identification of common marine aquarium fishes",
"Identification of common fresh water aquarium fishes",
"Breeding of egg layers",
"Breeding of live bearers",
"Evaluation of significance of aquaria for commercial and domestic use",
"-1",
"Principles of fish preservation. Importance of hygiene and sanitation in fish handling.",
"Quality of water and ice in fish handling and processing.",
"Preservation by refrigerated seawater and chilled sea water",
"-1",
"Fundamental principles involved in chilling and freezing of fish and fishery products.",
"Various freezing methods. Freezing of shrimps and fishes. Changes during the cold storage of fish and fishery products.",
"Principles involved in canning of fish. Different stages of canning of Tuna.",
"-1",
"Principles of smoking, drying and salting of fish, factors affecting drying.",
"Traditional drying / curing methods. Different types of drying. Drying of fish and prawns.",
"Principles of freeze drying. Accelerated freeze drying and packing of freeze dried products. Modern methods of preservation by irradiation and modified atmospheric storage.",
"-1",
"Functions of packing. Different types of packing materials and its quality evaluation. Packing requirements for frozen and cured products.",
"Statutory requirements for packing. Labeling requirements.",
"Different types of cold storages. Insulated and refrigerated vehicles",
"-1",
"Major countries, important products, export documents and procedures.",
"Prospects and constraints in export including tariff and non- tariff barriers.",
"Marine insurance, export incentives, registered exporters",
"-1",
"Determination of moisture content in fish and fishery products",
"General description – freezing",
"Processing shrimp",
"Filleting of fish",
"Drying of fish",
"Organoloptic analysis of fish",
"Preparation of fishery by products",
"Preparation of shark fin rays fish maws, chitin, fish wafer",
"Fish pickling",
"Value added fishery products, fish curry, cutlets fish finger.",
"Preparation of surimi",
"-1",
"Different members of the microbial community – General characteristics of bacteria, fungi, viruses and algae.",
"Structure of fungi and yeast cell.",
"Ultrastructure of virus – classification of viruses, Llfe cycle bacteriophages - lytic and lysogenic cycle.",
"-1",
"Different culture techniques. Nutrition and growth of bacteria – different types of media for isolation of bacteria and fungi.",
"Routine tests for identification of bacteria – morphological, cultural biocehemical and serological.",
"Basics of mycological and virologial techniques",
"-1",
"Perishability of seafood – Fish as an excellent medium for growth of microorganisms.",
"Spoilage microflora of fish and shellfish.",
"Intrinsic and extrinsic factors affecting spoilage.",
"-1",
"Fish meal, fish protein concentrate, shark fin rays, fish maws, isinglass, fish liver oil, fish body oil.",
"Fish hydrolysates, chitin, chitosan, glucosamine hydrochloride, squalene, pearl essence, ambergris, gelatin, beche-de-mer, fish silage, fish ensilage.",
"seaweed products like agar, alginic acid and carragenan.",
"-1",
"Different types of value added products from fish and shell fishes – status of value addition in Indian seafood sector. Advantages of value addition.",
"Fish mince and Surimi. Analog and fabricated products. Preparation of coated fishery products. Different types of batter and breading and its applications.",
"Preparation of products viz. fish / prawn pickle, fish wafers, prawn chutney powder, fish soup powder, fish protein hydrolysate, fish stacks, fillets, fish curry, mussel products, marinated products.",
"-1",
"Sterilization technique- dry heating, autoclaving",
"Media preparation",
"Isolation and maintenance of bacteria from fishes and water.",
"Gram staining of bacteria",
"Enumeration of bacteria by TPC method",
"Enumeration of total coli forms.",
"Evaluation of fish / fishery products for organoleptic, chemical and microbial quality",
"-1",
"Quality assessment of fish and fishery products - physical, chemical, organoleptic and microbiological.",
"Quality standards.",
"Quality Assurance. Inspection and quality assurance.",
"-1",
"Fish inspection in India- process,product quality,",
"water quality in fishery industry -Water analysis, treatments, chlorination, ozonisation, UV radiation, reverse osmosis",
"Techniques to remove pesticides and heavy metals.",
"-1",
"Sensory evaluation of fish and fish products, basic aspects, different methods of evaluation.",
"Quality problem in fishery products: good manufacturing practices. HACCP and ISO 9000 series of quality assurance system.",
"Validation and audit. national and international standards, EU regulation for fish export trade.",
"-1",
"Quality Control of fish and fishery products",
"Regulations for fishing vessels - pre-processing and processing plants, EU regulations.",
"Sanitation and hygiene - Environmental hygiene and Personal hygiene in processing plant",
"-1",
"Hazards in sea foods: Sea food toxins, biogenic amines, heavy metals and industrial pollutants.",
"Microbial food poisoning, bacteria of public health significance in fish /fishery products/environments - Salmonella, Clostridia, Staphylococcus, E.coli, Streptococcus, Vibrio, Aeromonas, Listeria, Yersinia, Bacillus.",
"Laboratory techniques for detection and identification of food poisoning bacteria. Mycotoxins in cured fish, bacterial associated with fish disease.",
"-1",
"PROJECT WORK"
];
connectDB()
.then(()=>
{
    console.log('approached');
  /*  var i=0,j=0,k=0;
    while(i<units.length ){
        if(units[i]=="-1"){
            i++;k++;continue;
        }
        while(j<subunits.length && subunits[j]!="-1"){
            var model_Obj = new model_info({name:units[i],semester:topic2[k],topic:subunits[j]});
            model_Obj.save()
            .then((data)=>console.log("yes"))
            .catch((err)=>console.log(err));
            j++;
        }
        i++;j++;
    }
    */
});

const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('client'));

app.use('/api/v1/' , require('./routes/MaterialsRoute'))

app.get('/' , (req,res) => {
    res.sendFile('./client/index.html', { root: __dirname });
}
);
const PORT = process.env.PORT || 5000 ; 
app.listen(PORT , console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`))



