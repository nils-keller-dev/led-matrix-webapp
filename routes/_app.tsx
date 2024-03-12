import { type PageProps } from "$fresh/server.ts";
export default function App({ Component }: PageProps) {
  return (
    <html class="h-full overflow-hidden">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>led-matrix-webapp</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body class="h-full">
        <Component />
      </body>
    </html>
  );
}
