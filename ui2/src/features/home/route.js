import {
  DefaultPage,
  Search,
  View,
  AddPage,
  EditPage,
} from './';

export default {
  path: '/',
  name: 'Home',
  childRoutes: [
    { path: 'default-page',
      name: 'Default page',
      component: DefaultPage,
      isIndex: true,
    },
    { path: 'search', name: 'Search', component: Search },
    { path: 'view', name: 'View', component: View },
    { path: 'add', name: 'Add page', component: AddPage },
    { path: 'edit', name: 'Edit page', component: EditPage },
  ],
};
