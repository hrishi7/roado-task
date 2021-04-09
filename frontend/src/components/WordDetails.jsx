import React from "react";
import { Typography } from "@material-ui/core";

export const WordDetails = (props) => {
  const { word } = props;
  return (
    <div>
      <Typography variant="h4">"{word.word}" details</Typography>
      <Typography variant="h6">Derivatives</Typography>
      {word.lexicalEntries &&
        word.lexicalEntries.map((entry) => (
          <>
            {entry.derivatives &&
              entry.derivatives.map((derivative) => (
                <Typography variant="body1" key={derivative.id}>
                  {derivative.text}
                </Typography>
              ))}
          </>
        ))}
      <br />
      <Typography variant="h6">etymologies</Typography>
      {word.lexicalEntries &&
        word.lexicalEntries.map((entry) => (
          <>
            {entry.entries &&
              entry.entries.map((singleEntry, ind) => (
                <>
                  {singleEntry.etymologies &&
                    singleEntry.etymologies.map((sentence, ind) => (
                      <Typography variant="body1" key={ind}>
                        {sentence}
                      </Typography>
                    ))}
                </>
              ))}
          </>
        ))}

      <br />
      <Typography variant="h6">synonyms</Typography>
      {word.lexicalEntries &&
        word.lexicalEntries.map((entry, ind) => (
          <>
            {entry.entries &&
              entry.entries.map(
                (singleEntry, ind) =>
                  singleEntry.senses &&
                  singleEntry.senses.map((synonyms, ind) => (
                    <>
                      {synonyms.synonyms &&
                        synonyms.synonyms.map((synonym, ind) => (
                          <Typography variant="body1" key={ind}>
                            {synonym.text}
                          </Typography>
                        ))}
                    </>
                  ))
              )}
          </>
        ))}
      <br />
      <Typography variant="h6">
        <b>phrases</b>
      </Typography>
      {word.lexicalEntries &&
        word.lexicalEntries.map((entry) => (
          <>
            {entry.phrases &&
              entry.phrases.map((singleEntry) => (
                <Typography variant="body1" key={singleEntry.id}>
                  {singleEntry.text}
                </Typography>
              ))}
          </>
        ))}
    </div>
  );
};
