export interface SubArea {
  id: string;
  name: string;
  population: number;
  density: number;
  coordinates: [number, number]; // [longitude, latitude]
}

export interface Constituency {
  id: string;
  name: string;
  division: string;
  district: string;
  subAreas: SubArea[];
}

export const BANGLADESH_CONSTITUENCIES: Record<string, Constituency> = {
  // DHAKA DIVISION (20 constituencies)
  'dhaka-1': {
    id: 'dhaka-1',
    name: 'Dhaka-1 (Tejgaon)',
    division: 'Dhaka',
    district: 'Dhaka',
    subAreas: [
      { id: 'tejgaon-ind', name: 'Tejgaon Industrial Area', population: 48000, density: 8200, coordinates: [90.3938, 23.7639] },
      { id: 'karwan-bazar', name: 'Karwan Bazar', population: 52000, density: 9100, coordinates: [90.3912, 23.7511] },
      { id: 'farmgate', name: 'Farmgate', population: 45000, density: 7800, coordinates: [90.3889, 23.7567] },
      { id: 'panthapath', name: 'Panthapath', population: 38000, density: 7200, coordinates: [90.3756, 23.7456] },
      { id: 'kawran-bazar', name: 'Kawran Bazar', population: 41000, density: 8500, coordinates: [90.3923, 23.7523] },
      { id: 'tejgaon-college', name: 'Tejgaon College Gate', population: 35000, density: 6900, coordinates: [90.3945, 23.7612] },
      { id: 'katabon', name: 'Katabon', population: 28000, density: 6200, coordinates: [90.3834, 23.7489] },
      { id: 'indira-road', name: 'Indira Road', population: 32000, density: 6800, coordinates: [90.3867, 23.7534] },
      { id: 'shukrabad', name: 'Shukrabad', population: 29000, density: 6100, coordinates: [90.3723, 23.7445] },
      { id: 'mohammadpur', name: 'Mohammadpur', population: 78000, density: 9800, coordinates: [90.3656, 23.7689] }
    ]
  },
  'dhaka-2': {
    id: 'dhaka-2',
    name: 'Dhaka-2 (Dhanmondi)',
    division: 'Dhaka',
    district: 'Dhaka',
    subAreas: [
      { id: 'dhanmondi-32', name: 'Dhanmondi-32', population: 38000, density: 7200, coordinates: [90.3742, 23.7461] },
      { id: 'dhanmondi-27', name: 'Dhanmondi-27', population: 41000, density: 7800, coordinates: [90.3781, 23.7506] },
      { id: 'dhanmondi-15', name: 'Dhanmondi-15', population: 35000, density: 7100, coordinates: [90.3834, 23.7489] },
      { id: 'lalmatia', name: 'Lalmatia', population: 35000, density: 6500, coordinates: [90.3689, 23.7578] },
      { id: 'jigatola', name: 'Jigatola', population: 42000, density: 8100, coordinates: [90.3712, 23.7534] },
      { id: 'dhanmondi-lake', name: 'Dhanmondi Lake Area', population: 25000, density: 5800, coordinates: [90.3789, 23.7456] },
      { id: 'kalabagan', name: 'Kalabagan', population: 48000, density: 8600, coordinates: [90.3812, 23.7423] },
      { id: 'elephant-road', name: 'Elephant Road', population: 55000, density: 9200, coordinates: [90.3756, 23.7389] },
      { id: 'new-market', name: 'New Market', population: 62000, density: 9800, coordinates: [90.3823, 23.7356] },
      { id: 'azimpur', name: 'Azimpur', population: 38000, density: 7400, coordinates: [90.3789, 23.7334] }
    ]
  },
  'dhaka-13': {
    id: 'dhaka-13',
    name: 'Dhaka-13 (Gulshan)',
    division: 'Dhaka',
    district: 'Dhaka',
    subAreas: [
      { id: 'gulshan-1', name: 'Gulshan-1', population: 28000, density: 5800, coordinates: [90.4156, 23.7947] },
      { id: 'gulshan-2', name: 'Gulshan-2', population: 35000, density: 6800, coordinates: [90.4206, 23.7889] },
      { id: 'banani', name: 'Banani', population: 42000, density: 7900, coordinates: [90.4067, 23.7936] },
      { id: 'baridhara', name: 'Baridhara', population: 32000, density: 6200, coordinates: [90.4289, 23.7978] },
      { id: 'baridhara-dohs', name: 'Baridhara DOHS', population: 25000, density: 5400, coordinates: [90.4323, 23.8023] },
      { id: 'mohakhali', name: 'Mohakhali', population: 45000, density: 8500, coordinates: [90.4078, 23.7756] },
      { id: 'niketon', name: 'Niketon', population: 32000, density: 6200, coordinates: [90.4153, 23.7847] },
      { id: 'wireless', name: 'Wireless', population: 38000, density: 7200, coordinates: [90.4234, 23.7823] },
      { id: 'tejkunipara', name: 'Tejkunipara', population: 42000, density: 7800, coordinates: [90.4267, 23.7856] },
      { id: 'banani-chairmanbari', name: 'Banani Chairmanbari', population: 35000, density: 6600, coordinates: [90.4034, 23.7889] }
    ]
  },

  // CHITTAGONG DIVISION (16 constituencies) 
  'chittagong-1': {
    id: 'chittagong-1',
    name: 'Chittagong-1 (Sitakunda)',
    division: 'Chittagong',
    district: 'Chittagong',
    subAreas: [
      { id: 'sitakunda', name: 'Sitakunda', population: 48000, density: 4200, coordinates: [91.6789, 22.6234] },
      { id: 'kumira', name: 'Kumira', population: 35000, density: 3600, coordinates: [91.6856, 22.6189] },
      { id: 'bhatiari', name: 'Bhatiari', population: 42000, density: 3900, coordinates: [91.6923, 22.6123] },
      { id: 'sonaichhari', name: 'Sonaichhari', population: 28000, density: 3200, coordinates: [91.6989, 22.6056] },
      { id: 'fouzdarhat', name: 'Fouzdarhat', population: 32000, density: 3500, coordinates: [91.7056, 22.5989] },
      { id: 'baraghona', name: 'Baraghona', population: 25000, density: 2900, coordinates: [91.7123, 22.5923] },
      { id: 'muradpur', name: 'Muradpur', population: 22000, density: 2600, coordinates: [91.7189, 22.5856] },
      { id: 'barabkunda', name: 'Barabkunda', population: 18000, density: 2200, coordinates: [91.7256, 22.5789] },
      { id: 'salimpur', name: 'Salimpur', population: 38000, density: 3800, coordinates: [91.6723, 22.6289] },
      { id: 'banshbaria', name: 'Banshbaria', population: 45000, density: 4100, coordinates: [91.6656, 22.6356] }
    ]
  },
  'chittagong-5': {
    id: 'chittagong-5',
    name: 'Chittagong-5 (Panchlaish)',
    division: 'Chittagong',
    district: 'Chittagong',
    subAreas: [
      { id: 'panchlaish', name: 'Panchlaish', population: 55000, density: 9200, coordinates: [91.7978, 22.3569] },
      { id: 'khulshi', name: 'Khulshi', population: 47000, density: 8100, coordinates: [91.8106, 22.3447] },
      { id: 'halishahar', name: 'Halishahar', population: 125000, density: 14200, coordinates: [91.8234, 22.3324] },
      { id: 'bayezid', name: 'Bayezid', population: 68000, density: 9600, coordinates: [91.7856, 22.3456] },
      { id: 'nasirabad', name: 'Nasirabad', population: 85000, density: 11200, coordinates: [91.7723, 22.3389] },
      { id: 'oxygen', name: 'Oxygen', population: 95000, density: 12800, coordinates: [91.7645, 22.3323] },
      { id: 'cci', name: 'Chittagong Cantonment', population: 32000, density: 4200, coordinates: [91.7567, 22.3256] },
      { id: 'agrabad', name: 'Agrabad', population: 78000, density: 10400, coordinates: [91.7489, 22.3189] },
      { id: 'mehedibag', name: 'Mehedibag', population: 52000, density: 8600, coordinates: [91.7412, 22.3123] },
      { id: 'epz', name: 'EPZ', population: 45000, density: 6800, coordinates: [91.7334, 22.3056] }
    ]
  },

  // RAJSHAHI DIVISION (18 constituencies)
  'rajshahi-1': {
    id: 'rajshahi-1',
    name: 'Rajshahi-1 (Rajshahi Sadar)',
    division: 'Rajshahi',
    district: 'Rajshahi',
    subAreas: [
      { id: 'rajshahi-sadar', name: 'Rajshahi Sadar', population: 85000, density: 7200, coordinates: [88.6042, 24.3745] },
      { id: 'shaheb-bazar', name: 'Shaheb Bazar', population: 68000, density: 6800, coordinates: [88.6089, 24.3689] },
      { id: 'laxmipur', name: 'Laxmipur', population: 52000, density: 5400, coordinates: [88.6136, 24.3623] },
      { id: 'court-area', name: 'Court Area', population: 45000, density: 4900, coordinates: [88.6183, 24.3556] },
      { id: 'new-market-raj', name: 'New Market Rajshahi', population: 78000, density: 6900, coordinates: [88.6230, 24.3489] },
      { id: 'boalia', name: 'Boalia', population: 125000, density: 9800, coordinates: [88.6277, 24.3423] },
      { id: 'rajpara', name: 'Rajpara', population: 95000, density: 8200, coordinates: [88.6324, 24.3356] },
      { id: 'motihar', name: 'Motihar', population: 110000, density: 9200, coordinates: [88.6371, 24.3289] },
      { id: 'talaimari', name: 'Talaimari', population: 58000, density: 5800, coordinates: [88.6418, 24.3223] },
      { id: 'uposhahar', name: 'Uposhahar', population: 75000, density: 6600, coordinates: [88.6465, 24.3156] }
    ]
  },

  // SYLHET DIVISION (12 constituencies)
  'sylhet-1': {
    id: 'sylhet-1',
    name: 'Sylhet-1 (Sylhet Sadar)',
    division: 'Sylhet',
    district: 'Sylhet',
    subAreas: [
      { id: 'sylhet-sadar', name: 'Sylhet Sadar', population: 125000, density: 9800, coordinates: [91.8723, 24.8978] },
      { id: 'zindabazar', name: 'Zindabazar', population: 95000, density: 8200, coordinates: [91.8656, 24.8912] },
      { id: 'bandarbazar', name: 'Bandarbazar', population: 78000, density: 7600, coordinates: [91.8589, 24.8845] },
      { id: 'dakshin-surma', name: 'Dakshin Surma', population: 68000, density: 6800, coordinates: [91.8523, 24.8778] },
      { id: 'kotwali-syl', name: 'Kotwali Sylhet', population: 85000, density: 7400, coordinates: [91.8456, 24.8712] },
      { id: 'moglabazar', name: 'Moglabazar', population: 52000, density: 5800, coordinates: [91.8789, 24.9045] },
      { id: 'amberkhana', name: 'Amberkhana', population: 45000, density: 5200, coordinates: [91.8823, 24.9112] },
      { id: 'upashahar-syl', name: 'Upashahar Sylhet', population: 58000, density: 6200, coordinates: [91.8856, 24.9178] },
      { id: 'sobhani-ghat', name: 'Sobhani Ghat', population: 42000, density: 4800, coordinates: [91.8889, 24.9245] },
      { id: 'lamabazar', name: 'Lamabazar', population: 35000, density: 4200, coordinates: [91.8923, 24.9312] }
    ]
  },

  // KHULNA DIVISION (23 constituencies)
  'khulna-1': {
    id: 'khulna-1',
    name: 'Khulna-1 (Khulna Sadar)',
    division: 'Khulna',
    district: 'Khulna',
    subAreas: [
      { id: 'khulna-sadar', name: 'Khulna Sadar', population: 125000, density: 9800, coordinates: [89.5645, 22.8456] },
      { id: 'boyra', name: 'Boyra', population: 85000, density: 7400, coordinates: [89.5578, 22.8389] },
      { id: 'sonadanga', name: 'Sonadanga', population: 95000, density: 8200, coordinates: [89.5512, 22.8323] },
      { id: 'khalishpur', name: 'Khalishpur', population: 115000, density: 9200, coordinates: [89.5445, 22.8256] },
      { id: 'doulatpur', name: 'Doulatpur', population: 78000, density: 6800, coordinates: [89.5378, 22.8189] },
      { id: 'labanchara', name: 'Labanchara', population: 58000, density: 5800, coordinates: [89.5312, 22.8123] },
      { id: 'rupsha', name: 'Rupsha', population: 68000, density: 6200, coordinates: [89.5245, 22.8056] },
      { id: 'aranghata', name: 'Aranghata', population: 52000, density: 5200, coordinates: [89.5178, 22.7989] },
      { id: 'phultala', name: 'Phultala', population: 45000, density: 4600, coordinates: [89.5112, 22.7923] },
      { id: 'digholia', name: 'Digholia', population: 42000, density: 4200, coordinates: [89.5045, 22.7856] }
    ]
  },

  // BARISAL DIVISION (20 constituencies)
  'barisal-1': {
    id: 'barisal-1',
    name: 'Barisal-1 (Barisal Sadar)',
    division: 'Barisal',
    district: 'Barisal',
    subAreas: [
      { id: 'barisal-sadar', name: 'Barisal Sadar', population: 125000, density: 9800, coordinates: [90.3712, 22.7010] },
      { id: 'kotwali-bar', name: 'Kotwali Barisal', population: 95000, density: 8200, coordinates: [90.3645, 22.6943] },
      { id: 'babuganj', name: 'Babuganj', population: 78000, density: 7200, coordinates: [90.3578, 22.6876] },
      { id: 'bakerganj', name: 'Bakerganj', population: 68000, density: 6400, coordinates: [90.3512, 22.6809] },
      { id: 'banaripara', name: 'Banaripara', population: 58000, density: 5800, coordinates: [90.3445, 22.6742] },
      { id: 'gournadi', name: 'Gournadi', population: 52000, density: 5200, coordinates: [90.3378, 22.6676] },
      { id: 'hizla', name: 'Hizla', population: 45000, density: 4600, coordinates: [90.3312, 22.6609] },
      { id: 'mehendiganj', name: 'Mehendiganj', population: 42000, density: 4200, coordinates: [90.3245, 22.6542] },
      { id: 'muladi', name: 'Muladi', population: 38000, density: 3800, coordinates: [90.3178, 22.6476] },
      { id: 'wazirpur', name: 'Wazirpur', population: 85000, density: 7600, coordinates: [90.3779, 22.7077] }
    ]
  },

  // RANGPUR DIVISION (16 constituencies)
  'rangpur-1': {
    id: 'rangpur-1',
    name: 'Rangpur-1 (Rangpur Sadar)',
    division: 'Rangpur',
    district: 'Rangpur',
    subAreas: [
      { id: 'rangpur-sadar', name: 'Rangpur Sadar', population: 125000, density: 9800, coordinates: [89.2444, 25.7439] },
      { id: 'gangachara', name: 'Gangachara', population: 68000, density: 6200, coordinates: [89.2512, 25.7506] },
      { id: 'kaunia', name: 'Kaunia', population: 58000, density: 5800, coordinates: [89.2578, 25.7572] },
      { id: 'mithapukur', name: 'Mithapukur', population: 52000, density: 5200, coordinates: [89.2645, 25.7639] },
      { id: 'badarganj', name: 'Badarganj', population: 78000, density: 7200, coordinates: [89.2712, 25.7706] },
      { id: 'taraganj', name: 'Taraganj', population: 45000, density: 4600, coordinates: [89.2778, 25.7772] },
      { id: 'pirganj', name: 'Pirganj', population: 85000, density: 7600, coordinates: [89.2845, 25.7839] },
      { id: 'pirgachha', name: 'Pirgachha', population: 42000, density: 4200, coordinates: [89.2912, 25.7906] },
      { id: 'mahiganj', name: 'Mahiganj', population: 38000, density: 3800, coordinates: [89.2978, 25.7972] },
      { id: 'rangpur-cantonment', name: 'Rangpur Cantonment', population: 35000, density: 3600, coordinates: [89.2378, 25.7372] }
    ]
  },

  // MYMENSINGH DIVISION (11 constituencies)
  'mymensingh-1': {
    id: 'mymensingh-1',
    name: 'Mymensingh-1 (Mymensingh Sadar)',
    division: 'Mymensingh',
    district: 'Mymensingh',
    subAreas: [
      { id: 'mymensingh-sadar', name: 'Mymensingh Sadar', population: 125000, density: 9800, coordinates: [90.4074, 24.7471] },
      { id: 'muktagacha', name: 'Muktagacha', population: 68000, density: 6200, coordinates: [90.4141, 24.7538] },
      { id: 'fulbaria', name: 'Fulbaria', population: 58000, density: 5800, coordinates: [90.4208, 24.7605] },
      { id: 'gafargaon', name: 'Gafargaon', population: 52000, density: 5200, coordinates: [90.4275, 24.7672] },
      { id: 'gauripur', name: 'Gauripur', population: 45000, density: 4600, coordinates: [90.4342, 24.7739] },
      { id: 'haluaghat', name: 'Haluaghat', population: 38000, density: 3800, coordinates: [90.4409, 24.7806] },
      { id: 'ishwarganj', name: 'Ishwarganj', population: 42000, density: 4200, coordinates: [90.4476, 24.7873] },
      { id: 'nandail', name: 'Nandail', population: 35000, density: 3600, coordinates: [90.4543, 24.7940] },
      { id: 'phulpur', name: 'Phulpur', population: 78000, density: 7200, coordinates: [90.4610, 24.8007] },
      { id: 'trishal', name: 'Trishal', population: 85000, density: 7600, coordinates: [90.4007, 24.7404] }
    ]
  }
};

export const DIVISIONS = ['Dhaka', 'Chittagong', 'Rajshahi', 'Sylhet', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh'];

export const getConstituenciesByDivision = (division: string) => {
  return Object.values(BANGLADESH_CONSTITUENCIES).filter(constituency => constituency.division === division);
};

export const searchConstituencies = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return Object.values(BANGLADESH_CONSTITUENCIES).filter(constituency =>
    constituency.name.toLowerCase().includes(lowercaseQuery) ||
    constituency.district.toLowerCase().includes(lowercaseQuery) ||
    constituency.division.toLowerCase().includes(lowercaseQuery)
  );
};