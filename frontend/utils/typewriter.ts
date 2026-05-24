export async function typeWriterEffect(

  text: string,

  onUpdate: (
    partialText: string
  ) => void,

  speed = 8

) {

  let currentText = "";

  for (let i = 0; i < text.length; i++) {

    currentText += text[i];

    onUpdate(currentText);

    await new Promise((resolve) =>
      setTimeout(resolve, speed)
    );
  }
}