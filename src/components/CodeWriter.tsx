import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import WebView from 'react-native-webview';
import { useAutoWriter } from '../hooks/useAutoWriter';

interface CodeWriterProps {
  children: string;
  language: string;
}

export const CodeWriter = ({ children: code, language }: CodeWriterProps) => {
  const codeViewRef = useRef<WebView>(null);
  const { text } = useAutoWriter({ timeDelay: 100, value: code });

  useEffect(() => {
    const script = `
      document.getElementById('code').innerHTML = \`\n${text.replace(
        '<',
        '&lt',
      )}\`;
      Prism.highlightElement(document.getElementById('code'))
  
      `;
    codeViewRef.current?.injectJavaScript(script);
  }, [text, language]);
  return (
    <WebView
      style={styles.webView}
      containerStyle={styles.webView}
      ref={codeViewRef}
      originWhitelist={['*']}
      source={{
        html: `
    <!DOCTYPE html>
      <html>
        <head>
          <link href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.22.0/themes/prism-funky.min.css" rel="stylesheet" />
        </head>
        <body style="background-color: black; display: flex;  align-items: center">
          <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
          <pre>
            <code style="font-size: 32px"  id="code" class="language-${language}" />
          </pre>
          <h1 id="test"/>
        </body>
      </html>
      `,
      }}
    />
  );
};

const styles = StyleSheet.create({
  webView: {
    backgroundColor: 'black',
    justifyContent: 'center',
  },
});
