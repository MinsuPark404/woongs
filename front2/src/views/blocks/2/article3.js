const hbs = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Block Style Layout</title>
<style>
  .container {
    display: flex;
    justify-content: space-around; /* Equally space out the blocks */
    padding: 20px;
  }

  .block {
    border: 1px solid #ccc; /* Light grey border */
    border-radius: 5px; /* Rounded corners */
    width: 30%; /* Each block takes up 30% of the container width */
    box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Subtle shadow */
    margin: 10px;
    padding: 20px;
    background: #f9f9f9; /* Light grey background */
    display: flex;
    flex-direction: column; /* Stack children vertically */
  }

  .block h2 {
    font-size: 20px; /* Title font size */
    color: #333; /* Dark grey color for text */
    margin: 0 0 10px 0;
  }

  .block p {
    font-size: 14px;
    color: #666; /* Medium grey color for text */
    line-height: 1.5;
  }

  .button {
    padding: 10px 15px;
    background-color: #007bff; /* Bootstrap primary color */
    color: white;
    text-align: center;
    border-radius: 5px;
    margin-top: 15px;
    text-decoration: none; /* Removes underline from links */
    display: inline-block; /* Allows for padding and margin */
  }

  .button:hover {
    background-color: #0056b3; /* Darker shade for hover effect */
  }
  .block img {
    max-width: 100%; /* 이미지가 블록의 너비를 초과하지 않도록 설정 */
    height: auto; /* 이미지의 높이를 자동으로 조절 */
    border-radius: 5px; /* 이미지에도 둥근 모서리 적용 */
  }
</style>
</head>
<body>

<div class="container">
  <div class="block">
    <img src="{{image1}}" alt="{{articleTitle1}}"> <!-- 이미지 추가 -->
    <p>{{text1}}</p>
    
  </div>
  <div class="block">
    <img src="{{image2}}" alt="{{articleTitle2}}"> <!-- 이미지 추가 -->
    <p>{{text2}}</p>
    
  </div>
  <div class="block">
    <img src="{{image3}}" alt="{{articleTitle3}}"> <!-- 이미지 추가 -->
    <p>{{text3}}</p>
    
  </div>
</div>

</body>
</html>

`;

const block = {
  hbs,
  name: 'Article #1',
  previewImageUrl: 'https://gamma.app/_next/static/media/Title-with-3-images.172b44a3.svg',
  category: 'article',
  defaultData: {
    title: 'Sample section',
    description: 'Lorem ipsum dolor sit amet.',
    image1: 'https://via.placeholder.com/450x450',
    image2: 'https://via.placeholder.com/450x450',
    image3: 'https://via.placeholder.com/450x450',
    articleTitle1: 'Hello World',
    articleTitle2: 'Hello World',
    articleTitle3: 'Hello World',
    text1: 'Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.',
    text2: 'Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.',
    text3: 'Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.',
  },
  config: {
    title: {
      type: "string",
      name: 'Section title',
    },
    description: {
      type: "string",
      name: 'Section description',
    },
    image1: {
      type: "string",
      name: 'Url to image #1',
    },
    image2: {
      type: "string",
      name: 'Url to image #2',
    },
    image3: {
      type: "string",
      name: 'Url to image #3',
    },
    articleTitle1: {
      type: "string",
      name: 'Title for the article #1',
    },
    articleTitle2: {
      type: "string",
      name: 'Title for the article #2',
    },
    articleTitle3: {
      type: "string",
      name: 'Title for the article #3',
    },
    text1: {
      type: "string",
      name: 'Content for the article #1',
    },
    text2: {
      type: "string",
      name: 'Content for the article #2',
    },
    text3: {
      type: "string",
      name: 'Content for the article #3',
    },
  }
};

export default block;
