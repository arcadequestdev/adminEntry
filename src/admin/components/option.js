export const categoriesOption = [
  {
    value:"Beverages",
    label:"Beverages"
  },
  {
    value:"Food",
    label:"Food"
  },
  {
    value:"Apparel & Fashionr",
    label:"Apparel & Fashion"
  },
  {
    value:"Automotive",
    label:"Automotive"
  },
  {
    value:"Banking",
    label:"Fintech"
  },
  {
    value:"Capital Markets",
    label:"Capital Markets"
  },
  {
    value:"Real Estate",
    label:"Real Estate"
  },
  {
    value:"Health Care",
    label:"Health Care"
  },
  {
    value:"PC Games",
    label:"PC Games"
  },
  {
    value:"Console Games",
    label:"Console Games"
  },
  {
    value:"Mobile Games",
    label:"Mobile Games"
  },
  {
    value:"Consumer electronics",
    label:"Consumer electronics"
  },
  {
    value:"Health & Fitness",
    label:"Health & Fitness"
  },
  {
    value:"Gambling",
    label:"Gambling"
  },
  {
    value:"Medical Devices",
    label:"Medical Devices"
  },
  {
    value:"Apps & Platforms",
    label:"Apps & Platforms"
  },
  {
    value:"Jewelry",
    label:"Jewelry"
  },
  {
    value:"Music",
    label:"Music"
  },
  {
    value:"Movies",
    label:"Movies"
  },
  {
    value:"Hospitality",
    label:"Hospitality"
  },
  {
    value:"Politics",
    label:"Politics"
  },
  {
    value:"Sports",
    label:"Sports"
  },
  {
    value:"Alcohol",
    label:"Alcohol"
  },
  {
    value:"Tobacco",
    label:"Tobacco"
  },
  {
    value:"Nicotine",
    label:"Nicotine"
  }
]

export const followerOptions = [
  {
    value:1,
    label:"1000-10,000",
    range:[1000, 10000]
  },
  {
    value:2,
    label:"10,000-50,000",
    range:[10000, 50000]
  },
  {
    value:3,
    label:"50,000-250,000",
    range:[50000, 250000]
  },
  {
    value:4,
    label:"250,000-500,0000",
    range:[250000, 500000]
  },
  {
    value:5,
    label:"500,000-1,000,000",
    range:[500000, 1000000]
  },
  {
    value:6,
    label:"1,000,000+",
    range:[1000000, 100000000]
  }
]


export const CCVOptions = [
  {
    value:1,
    label:"10-25",
    range:[10, 25]
  },
  {
    value:2,
    label:"25-50",
    range:[25,50]
  },
  {
    value:3,
    label:"50-100",
    range:[50, 100]
  },
  {
    value:4,
    label:"100-200",
    range:[100, 200]
  },

  {
    value:5,
    label:"200-300",
    range:[200, 300]
  },
  {
    value:6,
    label:"300-400",
    range:[300,400]
  },
  {
    value:7,
    label:"400-500",
    range:[400, 500]
  },
  {
    value:8,
    label:"500-1,000",
    range:[500, 10000]
  },
  {
    value:9,
    label:"1000+",
    range:[1000, 1000000]
  }
]

export const sortedByCVV = (cvvArr, list) => {
  const rangeList = cvvArr.reduce((arr, curr)=> {
    const item = CCVOptions.find(item => item.value === curr);
    arr.push(item.range);
    return arr;
  },[]);
  const sortedList = list.filter((item) => rangeList.some((range) => {
    return (item.avg_viewers> range[0]) && (item.avg_viewers < range[1])
  }))
  return sortedList;
}

export const sortedByFollowers = (followerArr, list) => {
  const rangeList = followerArr.reduce((arr, curr)=> {
    const item = followerOptions.find(item => item.value === curr);
    arr.push(item.range);
    return arr;
  },[]);

  const sortedList = list.filter((item) => rangeList.some((range) => {
    return (item.followers> range[0]) && (item.followers < range[1])
  }))
  return sortedList;
}

export const proposalStatus = {
  RECEIVED:0,
  ACCEPTED:1,
  REJECTED:2,
  CANCELLED:-1,
  ACTIVE:3,
  COMPLETED:4,
  SUBMITTED:5
}

export const modeOptions = [
  {
    label:"Build Solos",
    value:"defaultsolo"
  },
  {
    label:"No Build Solos",
    value:"nobuildbr_solo"
  },
  {
    label:"Arena Solos",
    value:"showdownalt_solo"
  },
  {
    label:"Build Duos",
    value:"defaultduo"
  },
  {
    label:"No Build Duos",
    value:"nobuildbr_duo"
  },
  {
    label:"Arena Duos",
    value:"showdownalt_duos"
  },
  {
    label:"Build Trios",
    value:"trios"
  },
  {
    label:"No Build Trios",
    value:"nobuildbr_trio"
  },
  {
    label:"Arena Trios",
    value:"showdownalt_trios"
  },
  {
    label:"Build Squads",
    value:"defaultsquad"
  },
  {
    label:"No Build Squads",
    value:"nobuildbr_squad"
  },
  {
    label:"Arena Squads",
    value:"showdownalt_squads"
  },
];

export const getLabel = (mode) => {
  const target = modeOptions.find((item) => item.value === mode);
  return target.label;
}


export const getProposalStatus = (status) => {
    if(status === proposalStatus.RECEIVED){
      return 'RECEIVED'
    }else if(status === proposalStatus.ACCEPTED){
      return 'ACCEPTED'
    }else if(status === proposalStatus.REJECTED){
      return 'REJECTED'
    }else if(status === proposalStatus.ACTIVE){
      return 'ACTIVE'
    }else if(status === proposalStatus.COMPLETED){
      return 'COMPLETED'
    }else if(status === proposalStatus.CANCELLED){
      return 'CANCELLED'
    }else if(status === proposalStatus.SUBMITTED){
      return 'COMPLETED'
    }
}