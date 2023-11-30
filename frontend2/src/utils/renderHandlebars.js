import axios from 'axios';
import handlebars from 'handlebars';
import documents from '../views/documents';
import section from '../views/section';
import blocks from '../views/blocks';

async function render(layoutBlocks, documentId) {
  // 백엔드에서 데이터를 가져오는 비동기 함수를 render 함수 안으로 통합
  const fetchDataFromBackend = async () => {
    try {
      const response = await axios.get('http://localhost:5000');
      return response.data;
    } catch (error) {
      console.error('Error during fetching data from backend:', error);
      return null;
    }
  };

  // 데이터를 미리 가져오기
  const dataFromBackend = await fetchDataFromBackend();

  // 데이터가 없을 경우의 처리가 필요할 수 있습니다.
  if (!dataFromBackend || dataFromBackend.length === 0) {
    console.error('No data received from backend');
    return ''; // 또는 오류 메시지를 포함한 HTML을 반환할 수 있습니다.
  }

  const innerHTML = layoutBlocks.reduce((acc, layoutBlock) => {
    const blockHbs = blocks[layoutBlock.blockId].hbs;
    const blockTemplate = handlebars.compile(blockHbs);
    const blockHTML = blockTemplate(layoutBlock.data);

    const sectionTemplate = handlebars.compile(section);
    const sectionHTML = sectionTemplate({
      content:blockHTML,
      uuid: layoutBlock.uuid
    });
    console.log(dataFromBackend)

    return `${acc}${sectionHTML}`;
  }, '');

  return handlebars.compile(documents[documentId].hbs)({
    content: innerHTML
  });
}

export default render;
