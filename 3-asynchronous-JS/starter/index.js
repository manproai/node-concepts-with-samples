const fs = require('fs');
const superagent = require('superagent');

// const readFilePro = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, 'utf-8', (err, data) => {
//       if (err) reject('could not find the file ' + file);
//       resolve(data);
//     });
//   });
// };

const readFilePro = async (file) => {
  try {
    return await fs.promises.readFile(file, 'utf-8');
  } catch (err) {
    throw new Error(err);
  }
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject(err);
      resolve('Success');
    });
  });
};

// readFilePro('./dog.txt')
//   .then((data) => {
//     console.log(`Breed: ${data}`);

//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message);
//     return writeFilePro('dog-link.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Saved link successfully');
//   })
//   .catch((err) => console.log(err));

const readGetWriteDogPic = async () => {
  try {
    const data = await readFilePro('./dog.txt');
    console.log('Breed: ' + data);

    const dogPic1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const dogPic2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const dogPic3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([dogPic1, dogPic2, dogPic3]);
    const images = all.map((el) => el.body.message);
    console.log(images);

    writeFilePro('./dog-link.txt', images.join('\n'));
    console.log('Saved link successfully');
  } catch (err) {
    throw err;
  }
  return '2: -------Async function---------';
};

(async () => {
  try {
    console.log('1: before getting get dogPic');
    const x = await readGetWriteDogPic();
    console.log(x);
    console.log('3: After getting get dogPic');
  } catch (err) {
    console.log(err);
  }
})();
