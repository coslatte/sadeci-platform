"use client";

import { FiGithub, FiBox, FiBookOpen } from "react-icons/fi";
import LinkCard from "@/components/molecules/LinkCard";
import { useAuth } from "@/lib/auth";
import { Text } from "@/components/atoms/Text";
import { Divider } from "@/components/atoms/Divider";
import {
  HOME_DEFAULT_GREETING,
  HOME_WELCOME_SUBTITLE,
  HOME_DOCUMENTATION_SECTION_TITLE,
  HOME_DOCUMENTATION_SECTION_DESCRIPTION,
  ABOUT_TITLE,
  ABOUT_DESC,
  PROJECT_LINKS,
} from "@/constants/constants";

export default function Home() {
  const { user } = useAuth();
  const greeting = user
    ? `Hola, ${user.name.split(" ")[0]}`
    : HOME_DEFAULT_GREETING;

  return (
    <div className="flex flex-col w-full max-w-6xl gap-8 mx-auto">
      <section className="px-6 py-8 bg-white border rounded-2xl border-slate-200/80 md:px-8">
        <div>
          <Text
            as="h1"
            size="2xl"
            weight="bold"
            tracking="tight"
            className="md:text-(length:--font-size-3xl)"
          >
            {greeting}
          </Text>
          <Text size="sm" muted className="mt-2 text-justify">
            {HOME_WELCOME_SUBTITLE}
          </Text>
        </div>

        <div className="flex flex-col gap-4 mt-6">
          <div className="flex items-center gap-3">
            <FiBox className="size-5 text-primary-600" />
            <Text as="h3" size="lg" weight="semibold">
              {ABOUT_TITLE}
            </Text>
          </div>
          <div className="space-y-4">
            <Text
              size="sm"
              className="leading-relaxed text-justify text-slate-600"
            >
              {ABOUT_DESC}
            </Text>
          </div>
        </div>
      </section>

      <section className="flex flex-col px-6 py-8 border-t-4 min-h-80 rounded-2xl border-slate-700/25 bg-slate-50 md:px-8">
        <header className="mb-6 text-center">
          <Text
            as="h2"
            size="lg"
            weight="semibold"
            tracking="tight"
            className="text-slate-100"
          >
            {HOME_DOCUMENTATION_SECTION_TITLE}
          </Text>
        </header>

        <Text size="sm" className="text-justify text-slate-200">
          {HOME_DOCUMENTATION_SECTION_DESCRIPTION}
        </Text>

        <Divider className="my-6 border-slate-600/80" />

        <div className="grid gap-4 mt-auto sm:mx-auto sm:w-full sm:max-w-4xl sm:grid-cols-2">
          {PROJECT_LINKS.map((link) => (
            <LinkCard
              key={link.href}
              href={link.href}
              icon={
                link.href.includes("github") ? (
                  <FiGithub className="size-5" />
                ) : (
                  <FiBookOpen className="size-5" />
                )
              }
              label={link.label}
              description={link.description}
              iconPosition="left"
            />
          ))}
        </div>
      </section>
    </div>
  );
}
