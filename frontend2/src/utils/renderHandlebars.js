import axios from 'axios';
import handlebars from 'handlebars';
import documents from '../views/documents';
import section from '../views/section';
import blocks from '../views/blocks';

async function Render(layoutBlocks, documentId) {
  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:5000');
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error('Error during fetching data from backend:', error);
      return null;
    }
  };

  const dataFromBackend = await fetchDataFromBackend();
  
  const innerHTML = layoutBlocks.reduce((acc, layoutBlock) => {
    const blockHbs = blocks[layoutBlock.blockId].hbs;
    const blockTemplate = handlebars.compile(blockHbs);
    const blockHTML = blockTemplate(layoutBlock.data);

    const sectionTemplate = handlebars.compile(section);
    const sectionHTML = sectionTemplate({
      content: blockHTML,
      uuid: layoutBlock.uuid,
    });

    console.log(dataFromBackend);
    return `${acc}${sectionHTML}`;
  }, '');

  return handlebars.compile(documents[documentId].hbs)({
    content: innerHTML,
  });
}

export default Render;
