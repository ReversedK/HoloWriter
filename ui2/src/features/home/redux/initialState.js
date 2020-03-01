const initialState = {
  searchByTagsPending: false,
  searchByTagsError: null,
  searchResult : [],
  viewPagePending: false,
  viewPageError: null,
  pageResult : '',
  addPagePending: false,
  addPageError: null,
  page_content: '',
  editPagePending: false,
  editPageError: null,  
  editPageResult: null,
  selectedTab:"write",
  setSelectedTab:"write",
  selectedLanguage: { value: 'FR_FR', label: 'Français' } ,
  language_list : [
  { value: 'FR_FR', label: 'Français' },
  { value: 'EN_US', label: 'English' } 
]
};

export default initialState;
