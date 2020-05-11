// © 2017 VARRO ANALYTICS. ALL RIGHTS RESERVED.
export const MOBILE_MAX_WIDTH = 500;

export const LEFT_SIDEBAR_PERCENT = 0.8;
export const SMALL_SCREEN_SIZE = 576;
export const MEDIUM_SCREEN_SIZE = 768;
export const LARGE_SCREEN_SIZE = 992;

export const routes = {
  landingPage: '/',
  fundraisingExplorer: '/fundraising-explorer',
  patentsExplorer: '/patents-explorer',
  logout: '/logout',
  FAQ: '/FAQ',
  TOS: '/terms-of-use',
  Privacy: '/privacy-policy'
};

export const industries = [
  { id: 'DNA', name: 'Foundational DNA Tools & Parts', color: '#2248AB', icon: '1 DNA.svg' },
  { id: 'Software', name: 'Software, Automation & Cloud Labs', color: '#00ADEE', icon: '2 Software.svg' },
  { id: 'Platform', name: 'Organism Engineering Platforms', color: '#00A69C', icon: '3 Platform.svg' },
  { id: 'Agriculture', name: 'Agriculture, Food & Materials', color: '#009345', icon: '4 Agriculture.svg' },
  { id: 'Chemicals', name: 'Industrial Chemicals', color: '#8BC53F', icon: '5 Chemicals.svg' },
  { id: 'Diagnostic', name: 'Genomic Medicine, Diagnostics & Disease Prevention', color: '#D50200', icon: '6 Diagnostics.svg' },
  { id: 'Pharma', name: 'Pharmaceuticals & Therapeutics', color: '#6A0800', icon: '7 Pharma.svg' },
  { id: 'Consumer and Enterprise', name: 'Consumer Genomics & Enterprise Data Storage', color: '#FAB512', icon: '8 Consumer Enterprise.svg' },
  { id: 'Fuel', name: 'Fuel', color: '#808184', icon: '9 Fuel.svg' }
];

export const exitTypes = [
  { id: 'IPO', name: 'IPO' },
  { id: 'Acquired', name: 'Acquired'},
  { id: 'Out of Business', name: 'Out of Business'},
  { id: 'Valuation Cut', name: 'Valuation Cut'}
];

export const industriesById = [];
industries.forEach(industry => {
  industriesById[industry.id] = industry;
});

export const defaultFilters = {
  industry: null,
  fundraisingTier: 'over25',
  date: { index: null, value: null },
  moneyType: 'all'
};

export const sliderStartYear = 2005;

export const fundraisingZoom = {
  under5In: {maxVal: 5000000, circleAxis: [500000, 1000000, 3000000] },
  in: {maxVal: 100000000, circleAxis: [10000000, 25000000, 50000000] },
  out: {maxVal: 1650000000, circleAxis: [25000000, 250000000, 1000000000] }
};

export const jurisdictions = [
  { name: 'US', flagUrl: 'US Flag.png' },
  { name: 'EPO', flagUrl: 'EU Flag.png'  }
];

export const documentTypes = [
  { name: 'Patent Application' },
  { name: 'Granted Patent' }
];

export const categories = {
  children: [
    {
      "color": "#009345",
      "children": [
        {
          "count": 14989,
          "name": "Reporters",
          "searchTerms": [
            "green AND fluorescent AND protein",
            "yellow AND fluorescent AND protein",
            "red AND fluorescent AND protein",
            "blue AND fluorescent AND protein",
            "luciferase"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 12333,
          "name": "Terminators",
          "searchTerms": [
            "'rho-independent' AND terminator AND gene",
            "'rho-dependent' AND terminator AND gene",
            "terminator AND gene AND operator",
            "terminator AND gene AND transcription AND dna"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 3351,
          "name": "Ribosome Binding Sites (RBS)",
          "searchTerms": [
            "'ribosome-binding site' OR 'ribosome binding site'"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 906,
          "name": "Plasmid Backbones",
          "searchTerms": [
            "plasmid backbone"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 1683,
          "name": "Chassis / Minimal Genomes",
          "searchTerms": [
            "bacteria AND chassis",
            "minimal genome"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 37052,
          "name": "Protein Coding Sequences (CDS)",
          "searchTerms": [
            "protein-coding sequence"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 45915,
          "name": "Promoters",
          "searchTerms": [
            "promoter AND dna"
          ],
          "searchFields": [
            "claims"
          ]
        }
      ],
      "name": "DNA Parts/Devices/Systems and Biological Chassis",
      "childrenColor": "#29DB1A"
    },
    {
      "color": "#0053A0",
      "children": [
        {
          "count": 1772,
          "name": "CRISPR",
          "searchTerms": [
            "CRISPR",
            "Clustered Regularly Interspaced Short Palindromic Repeats",
            "cas9"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 906,
          "name": "TALEN",
          "searchTerms": [
            "TALEN",
            "Transcription activator-like effector nuclease"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 4530,
          "name": "Zinc Finger",
          "searchTerms": [
            "zinc finger"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 1682,
          "name": "Recombinases",
          "searchTerms": [
            "Cre recombinase",
            "Hin recombinase",
            "Tre recombinase",
            "FLP recombinase"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 6378,
          "name": "DNA Assembly",
          "searchTerms": [
            "DNA assembly"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 391,
          "name": "Homing Endonuclease",
          "searchTerms": [
            "homing endonuclease"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 149,
          "name": "DNA Sequencing",
          "searchTerms": [
            "Massively parallel signature sequencing"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 13142,
          "name": "DNA Synthesis",
          "searchTerms": [
            "DNA synthesis"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 2126,
          "name": "Gene Silencing",
          "searchTerms": [
            "RNAi | siRNA"
          ],
          "searchFields": [
            "claims"
          ]
        }
      ],
      "name": "DNA Reading Writing and Editing Tools",
      "childrenColor": "#26A9E0"
    },
    {
      "color": "#FFF100",
      "children": [
        {
          "count": 778,
          "name": "CAD",
          "searchTerms": [
            "DNA AND software AND design"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 581,
          "name": "Predictive Tools",
          "searchTerms": [
            "DNA AND software AND predictive"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 1049,
          "name": "LIMS",
          "searchTerms": [
            "Laboratory Information Management System"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 64,
          "name": "Bioreactor",
          "searchTerms": [
            "bioreactor AND software"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 587,
          "name": "Liquid Handling",
          "searchTerms": [
            "liquid handling AND software"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 385,
          "name": "HPLC",
          "searchTerms": [
            "'High-performance liquid chromatography' AND software"
          ],
          "searchFields": [
            "claims"
          ]
        }
      ],
      "name": "Software, Cloud Labs and Automation",
      "childrenColor": "#F9EC66"
    },
    {
      "color": "#F05A28",
      "children": [
        {
          "count": 26,
          "name": "Deep Learning",
          "searchTerms": [
            "'machine learning' AND biology"
          ],
          "searchFields": [
            "claims"
          ]
        },
        {
          "count": 4207,
          "name": "Directed Evolution",
          "searchTerms": [
            "directed evolution"
          ],
          "searchFields": [
            "claims"
          ]
        }
      ],
      "name": "Strain Engineering Methods",
      "childrenColor": "#FF7700"
    }
  ]
};
