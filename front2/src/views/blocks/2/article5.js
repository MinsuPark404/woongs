const hbs = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Split Card Layout</title>
<style>
  .split-card {
    display: flex; /* Enables flexbox */
    width: 100%;
    margin: 20px; /* Margin around the card */
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  }

  .left-half {
    flex: 1; /* Takes up half of the space */
    width: 50%;
  }

  .right-half {
    flex: 1; /* Takes up the other half of the space */
    padding: 20px;
    width: 50%;
  }

  .split-card img {
    width: 100%; /* Full width */
    height: auto; /* Maintain aspect ratio */
    border-radius: 5px 0 0 5px; /* Rounded corners on the left side */
  }

  .right-half h2 {
    font-size: 1.5em; /* 1.5 times the default size */
  }

  .right-half p {
    font-size: 1em; /* Default size */
  }

  .right-half a {
    display: inline-block; /* Inline-block element */
    background-color: #007bff;
    color: white;
    padding: 10px 15px;
    text-decoration: none;
    border-radius: 5px;
    font-size: 1em;
    margin-top: 20px; /* Space above the button */
  }

  .right-half a:hover {
    background-color: #0056b3;
  }
</style>
</head>
<body>

<div class="split-card">
  <div class="left-half">
    <img src="{{image1}}" alt="Descriptive Alt Text">
  </div>
  <div class="right-half">
    <h2>{{text1}}</h2>
    <p>{{text2}}</p>
    <a href="#" class="btn">{{text3}}</a>
  </div>
</div>

</body>
</html>





`;

const block = {
  hbs,
  name: 'Article #1',
  previewImageUrl: 'https://gamma.app/_next/static/media/Title-with-2-Column-Image-Left.a898abf9.svg',
  category: 'article',
  defaultData: {
    title: 'Sample section',
    description: 'Lorem ipsum dolor sit amet.',
    image1: 'https://gamma.app/_next/static/media/Title-with-2-Column-Image-Left.a898abf9.svg',

    text1: 'Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.',
    text2: 'Aenean tortor est, vulputate quis leo in, vehicula rhoncus lacus. Praesent aliquam in tellus eu gravida. Aliquam varius finibus est, interdum justo suscipit id.',
    text3: 'Button text',
  },
  config: {
    
    image1: {
      type: "string",
      name: 'Url to image #1',
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
