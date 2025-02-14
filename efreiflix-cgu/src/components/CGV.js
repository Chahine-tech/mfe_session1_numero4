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

const CGV = () => {
  return (
    <Container>
      <Title>Conditions Générales de Vente</Title>

      <Section>
        <SectionTitle>1. Services Proposés</SectionTitle>
        <Text>
          EfreiFlix propose un service de streaming vidéo accessible via
          abonnement. Le service inclut l'accès à une bibliothèque de contenus
          vidéo en streaming.
        </Text>
      </Section>

      <Section>
        <SectionTitle>2. Prix et Facturation</SectionTitle>
        <Text>
          L'accès au service est inclus dans les frais de scolarité pour les
          étudiants. Pour le personnel, des conditions spéciales s'appliquent
          selon le statut.
        </Text>
      </Section>

      <Section>
        <SectionTitle>3. Durée et Résiliation</SectionTitle>
        <Text>
          L'accès au service est automatiquement accordé pour la durée de
          l'année académique. La résiliation est automatique à la fin de la
          période d'études ou du contrat de travail.
        </Text>
      </Section>

      <Section>
        <SectionTitle>4. Modalités de Paiement</SectionTitle>
        <Text>
          Pour les utilisateurs payants, le paiement s'effectue annuellement.
          Les moyens de paiement acceptés incluent la carte bancaire et le
          virement bancaire.
        </Text>
      </Section>

      <Section>
        <SectionTitle>5. Garanties et Responsabilités</SectionTitle>
        <Text>
          EfreiFlix s'engage à fournir un service de qualité mais ne peut
          garantir une disponibilité continue. En cas d'interruption, aucun
          remboursement ne sera effectué pour les périodes d'indisponibilité.
        </Text>
      </Section>
    </Container>
  );
};

export default CGV;
