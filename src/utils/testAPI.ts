import { testGoogleSearchSetup, learnFromWeb } from './chatLearning';

export async function runAPITest() {
  console.log('Testing Google Search API setup...');
  
  // Test basic setup
  const setupResult = await testGoogleSearchSetup();
  console.log('Setup test result:', setupResult.message);

  if (setupResult.success) {
    // Test actual search
    console.log('\nTesting search functionality...');
    try {
      const searchResults = await learnFromWeb('basic car maintenance tips');
      
      if (searchResults.length > 0) {
        console.log('Search successful! Sample result:');
        console.log('Content:', searchResults[0].content);
        console.log('Source:', searchResults[0].source);
        console.log('Relevance:', searchResults[0].relevance);
        console.log('\nTotal results:', searchResults.length);
      } else {
        console.log('Search completed but no results found.');
      }
    } catch (error) {
      console.error('Error during search test:', error);
    }
  }
} 