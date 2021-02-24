export const a11yProps = (index: number): Record<string, string> => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
});
