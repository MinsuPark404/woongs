const hbs = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Text Layout</title>
<style>
  .container {
    display: flex;
    width: 100%;
  }

  .left-column, .right-column {
    width: 50%; /* Each column takes up half the width of the container */
    padding: 10px;
  }

  /* Add some styling to the text */
  h1, p {
    margin: 0 0 10px 0;
  }

  h1 {
    font-size: 24px; /* or any size you prefer */
  }

  p {
    font-size: 16px; /* or any size you prefer */
    line-height: 1.6; /* Makes text more readable */
  }
</style>
</head>
<body>

<div class="container">
  <div class="left-column">
    <h1>{{title1}}</h1>
    <p>
      {{text1}}
    </p>
    <!-- More paragraphs as needed -->
  </div>
  <div class="right-column">
    <h1>{{title2}}</h1>
    <p>
      {{text2}}
    </p>
    <!-- More paragraphs as needed -->
  </div>
</div>

</body>
</html>



`;

const block = {
  hbs,
  name: 'Article #1',
  previewImageUrl: 'https://gamma.app/_next/static/media/Title-with-2-Column-Content.31842b2e.svg',
  category: 'article',
  defaultData: {
    title1: 'Sample section',
    title2:'sample2',
    text1: 'Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.',
    text2: 'Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.',
   
  },
  config: {
    title: {
      type: "string",
      name: 'Section title',
    },
    title2: {
        type: "string",
        name: 'Section title',
      },
   
    
    text1: {
      type: "string",
      name: 'Content for the article #1',
    },
    text2: {
      type: "string",
      name: 'Content for the article #2',
    }
    
  }
};

export default block;
