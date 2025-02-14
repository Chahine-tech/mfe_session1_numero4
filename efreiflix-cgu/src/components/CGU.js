import React from "react";
import styled from "styled-components";

const Container = styled.div`
  background-color: #f5f5f5;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #e50914;
  margin-bottom: 2rem;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #333;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const CGU = () => {
  return (
    <Container>
      <Title>Conditions Générales d'Utilisation</Title>

      <Section>
        <SectionTitle>1. Objet</SectionTitle>
        <Text>
          Les présentes Conditions Générales d'Utilisation régissent
          l'utilisation de la plateforme de streaming EfreiFlix. En accédant à
          notre service, vous acceptez d'être lié par ces conditions.
        </Text>
      </Section>

      <Section>
        <SectionTitle>2. Accès au Service</SectionTitle>
        <Text>
          L'accès à EfreiFlix est réservé aux étudiants et au personnel de
          l'EFREI. Chaque utilisateur doit créer un compte personnel avec ses
          identifiants EFREI.
        </Text>
      </Section>

      <Section>
        <SectionTitle>3. Utilisation du Service</SectionTitle>
        <Text>
          Les utilisateurs s'engagent à ne pas partager leurs identifiants de
          connexion. Le contenu disponible sur EfreiFlix est strictement réservé
          à un usage personnel et non commercial.
        </Text>
      </Section>

      <Section>
        <SectionTitle>4. Propriété Intellectuelle</SectionTitle>
        <Text>
          Tout le contenu disponible sur EfreiFlix est protégé par les droits
          d'auteur. La reproduction ou la distribution non autorisée du contenu
          est strictement interdite.
        </Text>
      </Section>
    </Container>
  );
};

export default CGU;
