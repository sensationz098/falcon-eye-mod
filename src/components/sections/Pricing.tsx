import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";

const pricingTiers = [
  {
    title: "Free",
    monthlyPrice: 0,
    buttonText: "Get started for free",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "2GB storage",
      "Integrations",
      "Basic support",
    ],
  },
  {
    title: "Pro",
    monthlyPrice: 9,
    buttonText: "Sign up now",
    popular: true,
    inverse: true,
    features: [
      "Up to 50 project members",
      "Unlimited tasks and projects",
      "50GB storage",
      "Integrations",
      "Priority support",
      "Advanced support",
      "Export support",
    ],
  },
  {
    title: "Business",
    monthlyPrice: 19,
    buttonText: "Sign up now",
    popular: false,
    inverse: false,
    features: [
      "Up to 5 project members",
      "Unlimited tasks and projects",
      "200GB storage",
      "Integrations",
      "Dedicated account manager",
      "Custom fields",
      "Advanced analytics",
      "Export capabilities",
      "API access",
      "Advanced security features",
    ],
  },
];

export const Pricing = () => {
  return (
    <section className="bg-white py-24" id="pricing">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">Pricing</h2>
          <p className="section-description mt-5">
            Free Forever. Upgrade for unlimited tasks, better security, and
            exclusive features.
          </p>
        </div>
        <div className="mt-10 flex flex-col items-center gap-6 lg:flex-row lg:items-end lg:justify-center">
          {pricingTiers.map(
            (
              { title, monthlyPrice, buttonText, popular, inverse, features },
              index,
            ) => (
              <div
                className={twMerge(
                  "card",
                  inverse && "border-black bg-black text-white",
                )}
                key={index}
              >
                <div className="flex justify-between">
                  <h3
                    className={twMerge(
                      "fomt-bold text-lg text-black/50",
                      inverse && "text-white/60",
                    )}
                  >
                    {title}
                  </h3>
                  {popular && (
                    <div className="inline-flex rounded-xl border border-white/20 px-4 py-1.5 text-sm">
                      <span className="rangeela bg-clip-text font-medium text-transparent">
                        Popular
                      </span>
                    </div>
                  )}
                </div>
                <div className="mt-[30px] flex items-baseline gap-1">
                  <span
                    className={twMerge(
                      "text-4xl font-bold leading-none tracking-tighter text-black",
                      inverse && "text-white",
                    )}
                  >
                    ${monthlyPrice}
                  </span>
                  <span
                    className={twMerge(
                      "font-bold tracking-tight text-black/50",
                      inverse && "text-white/50",
                    )}
                  >
                    /month
                  </span>
                </div>
                <button
                  className={twMerge(
                    "btn btn-primary mt-[30px] w-full",
                    inverse && "bg-white text-black",
                  )}
                >
                  {buttonText}
                </button>
                <ul className="mt-8 flex-col gap-10">
                  {features.map((feature, index) => (
                    <li
                      className={twMerge(
                        "my-2 flex items-center gap-4 text-sm text-black",
                        inverse && "text-red-white",
                      )}
                      key={index}
                    >
                      <Check className="h-6 w-6" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
};
