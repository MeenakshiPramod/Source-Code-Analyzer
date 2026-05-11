export async function typeWriterEffect(
  text: string,
  callback: (value: string) => void
) {

  let currentText = "";

  for (let i = 0; i < text.length; i++) {

    currentText += text[i];

    callback(currentText);

    await new Promise((resolve) =>
      setTimeout(resolve, 8)
    );
  }
}