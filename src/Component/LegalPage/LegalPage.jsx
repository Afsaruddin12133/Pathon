import React from "react";

const LegalPage = ({ pageData }) => {
  if (!pageData) {
    return (
      <section className="px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Page not found</h1>
        </div>
      </section>
    );
  }

  const colorConfig = {
    purple: {
      border: "border-purple-600",
      text: "text-purple-700",
      bg: "bg-purple-600",
      bgLight: "bg-purple-50",
      borderLight: "border-purple-200",
      from: "from-purple-50",
      to: "to-white",
      gradient: "from-purple-100 via-purple-50 to-blue-50",
      shadow: "shadow-purple-200",
      gradientDark: "from-purple-500 via-purple-600 to-blue-600",
    },
    blue: {
      border: "border-blue-600",
      text: "text-blue-700",
      bg: "bg-blue-600",
      bgLight: "bg-blue-50",
      borderLight: "border-blue-200",
      from: "from-blue-50",
      to: "to-white",
      gradient: "from-blue-100 via-blue-50 to-indigo-50",
      shadow: "shadow-blue-200",
      gradientDark: "from-blue-500 via-blue-600 to-indigo-600",
    },
    green: {
      border: "border-green-600",
      text: "text-green-700",
      bg: "bg-green-600",
      bgLight: "bg-green-50",
      borderLight: "border-green-200",
      from: "from-green-50",
      to: "to-white",
      gradient: "from-green-100 via-green-50 to-emerald-50",
      shadow: "shadow-green-200",
      gradientDark: "from-green-500 via-green-600 to-emerald-600",
    },
    // Add more colors as needed
  };

  const colors = colorConfig[pageData.color] || colorConfig.purple;

  // Map section types to render functions
  const renderContent = (section) => {
    switch (section.type) {
      case "text":
        return (
          <div className="text-gray-700 leading-relaxed">
            {section.content && (
              <p dangerouslySetInnerHTML={{ __html: section.content }} />
            )}
            {section.additionalContent && (
              <div
                className="mt-4"
                dangerouslySetInnerHTML={{ __html: section.additionalContent }}
              />
            )}
          </div>
        );

      case "cards":
        return (
          <div className="space-y-4">
            {section.items?.map((item, idx) => {
              const colorMap = {
                purple: "border-purple-500 bg-purple-50",
                blue: "border-blue-500 bg-blue-50",
                green: "border-green-500 bg-green-50",
                yellow: "border-yellow-500 bg-yellow-50",
                red: "border-red-500 bg-red-50",
                orange: "border-orange-500 bg-orange-50",
                indigo: "border-indigo-500 bg-indigo-50",
                pink: "border-pink-500 bg-pink-50",
              };

              const itemColor = colorMap[item.color] || colorMap.purple;

              return (
                <div
                  key={idx}
                  className={`border-l-4 ${itemColor} rounded-r-lg p-4`}
                >
                  <p className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </p>
                  <p className="text-gray-700 text-sm">{item.content}</p>
                </div>
              );
            })}
          </div>
        );

      case "grid":
        return (
          <div
            className={`grid ${
              section.items?.some((item) => item.fullWidth)
                ? "md:grid-cols-1"
                : section.items?.length === 2
                ? "md:grid-cols-2"
                : "md:grid-cols-3"
            } gap-4`}
          >
            {section.items?.map((item, idx) => {
              const colorMap = {
                purple:
                  "bg-purple-50 border-purple-200 hover:border-purple-400",
                blue: "bg-blue-50 border-blue-200 hover:border-blue-400",
                green: "bg-green-50 border-green-200 hover:border-green-400",
                yellow:
                  "bg-yellow-50 border-yellow-200 hover:border-yellow-400",
                red: "bg-red-50 border-red-200 hover:border-red-400",
                orange:
                  "bg-orange-50 border-orange-200 hover:border-orange-400",
              };

              const itemColor = colorMap[item.color] || colorMap.purple;

              return (
                <div
                  key={idx}
                  className={`${itemColor} ${
                    item.fullWidth ? "md:col-span-2" : ""
                  } rounded-xl p-5 border transition-colors duration-200`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    {item.icon && <span className="text-3xl">{item.icon}</span>}
                    <h3 className="font-bold text-gray-900">{item.title}</h3>
                  </div>
                  {item.content && (
                    <p className="text-gray-700 text-sm">{item.content}</p>
                  )}
                  {item.listItems && (
                    <ul className="mt-3 space-y-2">
                      {item.listItems.map((listItem, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-700"
                          dangerouslySetInnerHTML={{ __html: listItem }}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        );

      case "list":
        return (
          <div className="space-y-3">
            {section.intro && (
              <div
                className="text-gray-700 mb-4"
                dangerouslySetInnerHTML={{ __html: section.intro }}
              />
            )}
            {section.items?.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-red-50 rounded-lg p-4 border-l-4 border-red-500"
              >
                <span className="text-red-600 text-xl mt-0.5">✗</span>
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        );

      case "complex":
        return (
          <div className="space-y-6">
            {section.intro && (
              <div className="bg-blue-50 rounded-xl p-6 mb-5 border-2 border-blue-200">
                <p
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: section.intro }}
                />
              </div>
            )}

            {section.items?.map((item, idx) => {
              const colorMap = {
                purple: "border-purple-500 bg-purple-50",
                blue: "border-blue-500 bg-blue-50",
                green: "border-green-500 bg-green-50",
                yellow: "border-yellow-500 bg-yellow-50",
                red: "border-red-500 bg-red-50",
                orange: "border-orange-500 bg-orange-50",
              };

              const itemColor = colorMap[item.color] || colorMap.purple;

              return (
                <div
                  key={idx}
                  className={`border-l-4 ${itemColor} rounded-xl p-5`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    {item.icon && <span className="text-2xl">{item.icon}</span>}
                    {item.title && (
                      <h3
                        className="font-bold text-gray-900"
                        dangerouslySetInnerHTML={{ __html: item.title }}
                      />
                    )}
                  </div>
                  {item.content && (
                    <p className="text-gray-700 text-sm">{item.content}</p>
                  )}
                  {item.subItems && (
                    <div className="space-y-3 ml-6 mt-3">
                      {item.subItems.map((subItem, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <span dangerouslySetInnerHTML={{ __html: subItem }} />
                        </div>
                      ))}
                    </div>
                  )}
                  {item.listItems && (
                    <ul className="ml-6 mt-3 space-y-2">
                      {item.listItems.map((listItem, i) => (
                        <li
                          key={i}
                          className="text-sm text-gray-700"
                          dangerouslySetInnerHTML={{ __html: listItem }}
                        />
                      ))}
                    </ul>
                  )}
                  {item.outcomes && (
                    <div className="mt-4 space-y-3">
                      {item.outcomes.map((outcome, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-2 p-3 rounded-lg ${
                            outcome.type === "valid"
                              ? "bg-green-50 border border-green-200"
                              : "bg-red-50 border border-red-200"
                          }`}
                        >
                          <span
                            className={
                              outcome.type === "valid"
                                ? "text-green-600"
                                : "text-red-600"
                            }
                          >
                            {outcome.type === "valid" ? "✓" : "✗"}
                          </span>
                          <span className="text-gray-700">
                            {outcome.content}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            {section.note && (
              <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <p className="text-gray-700 text-sm font-medium">
                  {section.note}
                </p>
              </div>
            )}
          </div>
        );

      case "special":
        return (
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            {section.content && (
              <p
                className="text-gray-700 leading-relaxed mb-4"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
            {section.subsections && (
              <div className="space-y-4 mt-4">
                {section.subsections.map((subsection, idx) => (
                  <div
                    key={idx}
                    className={`border-l-4 ${
                      subsection.color === "green"
                        ? "border-green-500 bg-green-50"
                        : "border-orange-500 bg-orange-50"
                    } rounded-r-lg p-4`}
                  >
                    <p className="font-semibold text-gray-900 mb-2">
                      {subsection.title}
                    </p>
                    <p className="text-gray-700 text-sm">
                      {subsection.content}
                    </p>
                  </div>
                ))}
              </div>
            )}
            {section.listItems && (
              <ul className="mt-4 space-y-2 ml-4">
                {section.listItems.map((item, idx) => (
                  <li
                    key={idx}
                    className="text-gray-700 flex items-start gap-2"
                  >
                    <span className="text-yellow-600 mt-1">⚠️</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case "contact":
        return (
          <div className="space-y-4">
            {section.content && (
              <p className="text-gray-700 mb-4">{section.content}</p>
            )}
            <div className="grid md:grid-cols-2 gap-4">
              {section.items?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 bg-gray-50 rounded-xl p-4"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <p className="text-sm text-gray-600">{item.label}</p>
                    <p className="font-semibold text-gray-900">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      // New section types for About Us
      case "hero":
        return (
          <div className="text-center">
            {section.titleText && (
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
                {section.titleText}
              </h1>
            )}
            {section.content && (
              <p
                className="text-lg sm:text-xl text-gray-700 mb-4 leading-relaxed max-w-3xl mx-auto"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}
            {section.subtitle && (
              <p className="text-base text-gray-600 italic max-w-2xl mx-auto">
                {section.subtitle}
              </p>
            )}

            {section.stats && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 max-w-2xl mx-auto">
                {section.stats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-2xl">{stat.icon}</div>
                    <div className="text-2xl font-bold text-gray-900 mt-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "dual-column":
        return (
          <div className="grid md:grid-cols-2 gap-8">
            {section.leftContent && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {section.leftContent.title}
                </h3>
                <p className="text-gray-700">
                  {section.leftContent.description}
                </p>
                {section.leftContent.highlight && (
                  <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
                    <p className="font-semibold text-purple-700">
                      {section.leftContent.highlight}
                    </p>
                  </div>
                )}
              </div>
            )}
            {section.rightContent && (
              <div className="space-y-6">
                {section.rightContent.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      {item.icon && (
                        <span className="text-2xl">{item.icon}</span>
                      )}
                      <h4 className="font-bold text-lg text-gray-900">
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      // Add these new cases to the existing switch statement in LegalPage.jsx
      case "job-listings":
        return (
          <div className="space-y-8">
            {section.departments?.map((dept, deptIdx) => (
              <div
                key={deptIdx}
                className="bg-white border border-gray-200 rounded-2xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b">
                  {dept.name}
                </h3>
                <div className="space-y-4">
                  {dept.positions?.map((position, posIdx) => (
                    <div
                      key={posIdx}
                      className="bg-gray-50 hover:bg-gray-100 rounded-xl p-5 transition-colors border border-gray-200"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">
                            {position.title}
                          </h4>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                              {position.type}
                            </span>
                            <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                              {position.location}
                            </span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                              {position.experience}
                            </span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold">
                          Apply Now
                        </button>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">
                        {position.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {position.skills?.map((skill, skillIdx) => (
                          <span
                            key={skillIdx}
                            className="px-3 py-1 bg-gray-200 text-gray-700 text-xs rounded-full"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case "process":
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.steps?.map((step, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-5 text-center"
              >
                <div className="text-4xl font-bold text-purple-600 mb-3">
                  {step.number}
                </div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">{step.description}</p>
                <div className="text-xs text-gray-500 font-medium">
                  {step.duration}
                </div>
              </div>
            ))}
          </div>
        );

      case "benefits":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {section.benefitCategories?.map((category, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-5"
              >
                <h3 className="font-bold text-lg text-gray-900 mb-4">
                  {category.category}
                </h3>
                <ul className="space-y-2">
                  {category.items?.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-green-500 mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );

      case "career-cta":
        return (
          <div className="text-center space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {section.actions?.map((action, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{action.description}</p>
                  <button
                    className={`px-6 py-2 rounded-lg font-semibold ${
                      action.buttonVariant === "primary"
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-white text-purple-600 border border-purple-600 hover:bg-purple-50"
                    } transition-colors`}
                  >
                    {action.buttonText}
                  </button>
                </div>
              ))}
            </div>
            {section.contact && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-gray-700">
                  <span className="font-semibold">Contact:</span>{" "}
                  {section.contact.email}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {section.contact.note}
                </p>
              </div>
            )}
          </div>
        );

      case "featured-posts":
        return (
          <div className="grid md:grid-cols-3 gap-6">
            {section.posts?.map((post, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-4xl">{post.image}</span>
                  </div>
                  <div className="mb-2">
                    <span className="px-3 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
                  <button className="text-purple-600 font-semibold text-sm hover:text-purple-800">
                    Read More →
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case "categories":
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {section.categories?.map((category, idx) => {
              const colorMap = {
                purple: "bg-purple-50 border-purple-200 text-purple-700",
                blue: "bg-blue-50 border-blue-200 text-blue-700",
                green: "bg-green-50 border-green-200 text-green-700",
                yellow: "bg-yellow-50 border-yellow-200 text-yellow-700",
                pink: "bg-pink-50 border-pink-200 text-pink-700",
                indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
              };

              return (
                <div
                  key={idx}
                  className={`${
                    colorMap[category.color] || colorMap.purple
                  } border rounded-xl p-5 hover:shadow-md transition-shadow`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="font-bold text-lg">{category.name}</h3>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">
                    {category.description}
                  </p>
                  <div className="text-xs text-gray-500 font-medium">
                    {category.count} articles
                  </div>
                </div>
              );
            })}
          </div>
        );

      case "popular-posts":
        return (
          <div className="space-y-4">
            {section.posts?.map((post, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition-colors"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        {post.category}
                      </span>
                      <span className="text-xs text-gray-500">
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{post.excerpt}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {post.views}
                    </div>
                    <div className="text-xs text-gray-500">views</div>
                    <div className="text-xs text-gray-500 mt-2">
                      {post.date}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "newsletter":
        return (
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="max-w-2xl mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">{section.title}</h3>
              <p className="mb-6">{section.content}</p>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                {section.benefits?.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span>✓</span>
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder={section.placeholder}
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900"
                />
                <button className="px-6 py-3 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
                  {section.buttonText}
                </button>
              </div>
            </div>
          </div>
        );

      case "contribute":
        return (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-gray-700 mb-6">{section.content}</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-gray-900 mb-3">Guidelines</h4>
                <ul className="space-y-2">
                  {section.guidelines?.map((guideline, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-gray-700"
                    >
                      <span className="text-blue-500 mt-1">•</span>
                      {guideline}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 mb-3">How to Submit</h4>
                <p className="text-gray-700 mb-4">{section.contact?.process}</p>
                <p className="text-gray-700">
                  <span className="font-semibold">Email:</span>{" "}
                  {section.contact?.email}
                </p>
              </div>
            </div>
          </div>
        );

      case "help-categories":
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {section.categories?.map((category, idx) => {
              const colorMap = {
                purple: "border-purple-500 bg-purple-50",
                blue: "border-blue-500 bg-blue-50",
                green: "border-green-500 bg-green-50",
                yellow: "border-yellow-500 bg-yellow-50",
                red: "border-red-500 bg-red-50",
                indigo: "border-indigo-500 bg-indigo-50",
              };

              return (
                <div
                  key={idx}
                  className={`border-l-4 ${
                    colorMap[category.color] || colorMap.purple
                  } rounded-r-xl p-5`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">{category.icon}</span>
                    <h3 className="font-bold text-lg text-gray-900">
                      {category.title}
                    </h3>
                  </div>
                  <ul className="space-y-2">
                    {category.questions?.map((question, qIdx) => (
                      <li
                        key={qIdx}
                        className="text-gray-700 text-sm hover:text-purple-600 cursor-pointer"
                      >
                        {question}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        );

      case "faq":
        return (
          <div className="space-y-4">
            {section.faqs?.map((faq, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-5"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {faq.category}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 mb-2">
                      {faq.question}
                    </h4>
                    <p className="text-gray-700 text-sm">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "contact-methods":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {section.methods?.map((method, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-5"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{method.title.split(" ")[0]}</span>
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {method.title.substring(2)}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {method.description}
                    </p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Contact:</p>
                    <p className="font-semibold text-gray-900">
                      {method.contact}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Response time:</p>
                    <p className="font-semibold text-green-600">
                      {method.response}
                    </p>
                  </div>
                  {method.hours && (
                    <div>
                      <p className="text-sm text-gray-600">Hours:</p>
                      <p className="font-semibold text-gray-900">
                        {method.hours}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-sm text-gray-600">Best for:</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {method.bestFor?.map((useCase, useIdx) => (
                        <span
                          key={useIdx}
                          className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                        >
                          {useCase}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case "status":
        return (
          <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {Object.entries(section.status || {}).map(([key, value]) => (
                <div key={key} className="bg-white rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 capitalize mb-1">{key}</p>
                  <p
                    className={`font-bold text-lg ${
                      value === "Operational"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
            {section.incidents && section.incidents.length > 0 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-r-lg">
                <h4 className="font-bold text-gray-900 mb-2">
                  Scheduled Maintenance
                </h4>
                {section.incidents.map((incident, idx) => (
                  <div key={idx} className="text-sm text-gray-700">
                    <p>
                      <span className="font-semibold">{incident.title}:</span>{" "}
                      {incident.date} ({incident.time})
                    </p>
                    <p className="mt-1">{incident.impact}</p>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 flex justify-between items-center">
              <a
                href={section.checkUrl}
                className="text-blue-600 font-semibold hover:underline"
              >
                Check detailed status
              </a>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-semibold">
                {section.subscribeText}
              </button>
            </div>
          </div>
        );

      case "community-resources":
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {section.resources?.map((resource, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-5 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-3xl mb-3">{resource.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  {resource.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {resource.description}
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  {resource.members ||
                    resource.duration ||
                    resource.articles ||
                    resource.schedule}
                </div>
                <a
                  href={resource.link}
                  className="text-purple-600 font-semibold text-sm hover:text-purple-800"
                >
                  Explore →
                </a>
              </div>
            ))}
          </div>
        );

      case "feedback":
        return (
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <p className="text-gray-700 mb-6">{section.content}</p>
            <div className="grid md:grid-cols-3 gap-6">
              {section.channels?.map((channel, idx) => (
                <div key={idx} className="text-center">
                  <div className="text-3xl mb-3">{channel.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">
                    {channel.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {channel.description}
                  </p>
                  <a
                    href={channel.link}
                    className="text-purple-600 font-semibold text-sm hover:text-purple-800"
                  >
                    Submit →
                  </a>
                </div>
              ))}
            </div>
            {section.responseNote && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600">{section.responseNote}</p>
              </div>
            )}
          </div>
        );

      case "feature-grid":
        return (
          <div className="space-y-6">
            {section.subtitle && (
              <p className="text-gray-600 text-lg mb-6">{section.subtitle}</p>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.features?.map((feature, idx) => {
                const colorClasses = {
                  purple: "bg-purple-50 border-purple-100",
                  blue: "bg-blue-50 border-blue-100",
                  green: "bg-green-50 border-green-100",
                  yellow: "bg-yellow-50 border-yellow-100",
                  indigo: "bg-indigo-50 border-indigo-100",
                  pink: "bg-pink-50 border-pink-100",
                };

                return (
                  <div
                    key={idx}
                    className={`${
                      colorClasses[feature.color] || colorClasses.purple
                    } border rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm">
                        <span className="text-2xl">{feature.icon}</span>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-gray-600 mb-4">{feature.description}</p>
                    {feature.highlights && (
                      <ul className="space-y-2">
                        {feature.highlights.map((highlight, hIdx) => (
                          <li
                            key={hIdx}
                            className="flex items-center gap-2 text-sm text-gray-700"
                          >
                            <span className="text-green-500">✓</span>
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "comparison":
        return (
          <div className="space-y-8">
            {section.intro && (
              <p className="text-gray-600 text-lg">{section.intro}</p>
            )}
            <div className="grid md:grid-cols-2 gap-8">
              {section.comparisons?.map((comparison, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6 pb-3 border-b">
                    {comparison.category}
                  </h3>
                  <div className="space-y-5">
                    {comparison.items?.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1 text-xl">
                          {item.title.split(" ")[0]}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {item.title.substring(2)}
                          </h4>
                          <p className="text-gray-600 text-sm">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "value-props":
        return (
          <div className="grid md:grid-cols-2 gap-6">
            {section.valueProps?.map((prop, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-purple-100 text-purple-600">
                    <span className="text-xl">{prop.icon}</span>
                  </div>
                  <h3 className="font-bold text-lg text-gray-900">
                    {prop.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{prop.description}</p>
                {prop.stats && (
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm font-semibold text-purple-700">
                      {prop.stats}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case "tech-stack":
        return (
          <div className="space-y-8">
            {section.description && (
              <p className="text-gray-600 text-lg">{section.description}</p>
            )}
            {section.content && (
              <p className="text-gray-600 text-lg">{section.content}</p>
            )}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.technologies?.map((tech, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-5"
                >
                  <h3 className="font-bold text-gray-900 mb-4">
                    {tech.category}
                  </h3>
                  <ul className="space-y-2">
                    {tech.stack?.map((item, itemIdx) => (
                      <li
                        key={itemIdx}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        <span className="text-purple-500">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );

      case "team-grid":
        return (
          <div className="space-y-8">
            {section.teams?.map((team, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {team.category}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {team.members?.map((member, memberIdx) => {
                    const colorMap = {
                      purple: "bg-purple-100 text-purple-700",
                      blue: "bg-blue-100 text-blue-700",
                      green: "bg-green-100 text-green-700",
                      pink: "bg-pink-100 text-pink-700",
                      yellow: "bg-yellow-100 text-yellow-700",
                      indigo: "bg-indigo-100 text-indigo-700",
                    };

                    return (
                      <div
                        key={memberIdx}
                        className="bg-white border border-gray-200 rounded-xl p-6"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div
                            className={`flex items-center justify-center w-12 h-12 rounded-full ${
                              colorMap[member.color] || colorMap.purple
                            } font-bold`}
                          >
                            {member.initials}
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900">
                              {member.role}
                            </h4>
                          </div>
                        </div>
                        <blockquote className="text-gray-600 italic border-l-4 border-gray-300 pl-4 py-1">
                          {member.quote}
                        </blockquote>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        );

      case "partnership":
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {section.partners?.map((partner, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 backdrop-blur-sm rounded-xl p-5 text-center"
                >
                  <div className="text-4xl mb-3">{partner.logo}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-1">
                    {partner.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {partner.description}
                  </p>
                  <p className="text-sm text-gray-700">
                    {partner.contribution}
                  </p>
                </div>
              ))}
            </div>
            {section.quote && (
              <div className="mt-6 pt-6 border-t border-white/30">
                <p className="text-gray-700 text-center italic">
                  "{section.quote}"
                </p>
              </div>
            )}
          </div>
        );

      case "impact":
        return (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {section.metrics?.map((metric, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-gray-200 rounded-xl p-5 text-center"
                >
                  <div className="text-3xl mb-2">{metric.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </div>
                  <div className="font-semibold text-gray-800 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-sm text-gray-600">
                    {metric.description}
                  </div>
                </div>
              ))}
            </div>

            {section.testimonials && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  What Our Community Says
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {section.testimonials.map((testimonial, idx) => (
                    <div key={idx} className="bg-purple-50 rounded-xl p-5">
                      <p className="text-gray-700 italic mb-2">
                        "{testimonial.text}"
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.author}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case "cta":
        return (
          <div className="text-center space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {section.actions?.map((action, idx) => (
                <div
                  key={idx}
                  className="bg-white/90 backdrop-blur-sm rounded-xl p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{action.description}</p>
                  <button
                    className={`px-6 py-2 rounded-lg font-semibold ${
                      action.buttonVariant === "primary"
                        ? "bg-purple-600 text-white hover:bg-purple-700"
                        : "bg-white text-purple-600 border border-purple-600 hover:bg-purple-50"
                    } transition-colors`}
                  >
                    {action.buttonText}
                  </button>
                </div>
              ))}
            </div>
            {section.closingQuote && (
              <div className="mt-8 pt-6 border-t border-white/30">
                <p className="text-xl font-semibold text-gray-800">
                  "{section.closingQuote}"
                </p>
              </div>
            )}
          </div>
        );

      default:
        return (
          <p className="text-gray-700">
            Content type not supported: {section.type}
          </p>
        );
    }
  };

  // Helper function to render section header
  const renderSectionHeader = (section) => {
    const hasNumber = section.number !== undefined;
    const isHero = section.type === "hero";
    const isIntroduction = section.id === "introduction";

    if (isHero) return null;

    return (
      <>
        {hasNumber && (
          <div className="flex items-center gap-3 mb-5">
            <span
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                section.specialStyle
                  ? colors.bg.replace("600", "700")
                  : colors.bg
              } text-white font-bold text-lg`}
            >
              {section.number}
            </span>
            <div>
              <h2 className="font-bold text-2xl text-gray-900">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-gray-600 mt-1">{section.subtitle}</p>
              )}
            </div>
          </div>
        )}

        {!hasNumber && section.title && !isIntroduction && (
          <h2 className="font-bold text-2xl text-gray-900 mb-5">
            {section.title}
          </h2>
        )}

        {isIntroduction && pageData.effectiveDate && (
          <div className="text-left text-gray-700 mb-4">
            <p>
              <span className="font-semibold">Effective Date:</span>{" "}
              {pageData.effectiveDate}
            </p>
            {pageData.lastUpdated && (
              <p>
                <span className="font-semibold">Last Updated:</span>{" "}
                {pageData.lastUpdated}
              </p>
            )}
            <br />
          </div>
        )}
      </>
    );
  };

  return (
    <section
      className={`px-4 sm:px-6 lg:px-8 py-12 bg-gradient-to-b ${colors.from} ${colors.to}`}
    >
      {/* Page Title */}
      {pageData.category === "company" ? (
        <div className="mb-12 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 mb-4">
            {pageData.title}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {pageData.description}
          </p>
        </div>
      ) : (
        <div className="flex justify-center mb-8">
          <span
            className={`inline-flex items-center rounded-xl border-2 ${colors.border} bg-white px-8 py-2.5 ${colors.text} font-bold text-2xl lg:text-3xl shadow-md`}
          >
            {pageData.title}
          </span>
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        {pageData.sections.map((section) => {
          const isHero = section.type === "hero";
          const isSpecialSection =
            section.specialStyle ||
            ["partnership", "cta", "hero", "impact"].includes(section.type);

          if (isHero) {
            return (
              <div key={section.id} className="mb-12">
                {renderContent(section)}
              </div>
            );
          }

          return (
            <div
              key={section.id}
              className={`${
                isSpecialSection
                  ? `bg-gradient-to-br ${
                      colors.gradient
                    } rounded-2xl shadow-lg p-8 border-2 ${colors.border.replace(
                      "600",
                      "300"
                    )}`
                  : "bg-white rounded-2xl shadow-md p-8 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
              } mb-8`}
            >
              {renderSectionHeader(section)}
              {renderContent(section)}

              {section.additionalContent && (
                <div
                  className="mt-4"
                  dangerouslySetInnerHTML={{
                    __html: section.additionalContent,
                  }}
                />
              )}

              {section.quote && (
                <div className="relative bg-gradient-to-r from-purple-500 via-purple-600 to-blue-600 rounded-2xl p-8 shadow-xl overflow-hidden mt-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                  <div className="relative">
                    <div className="flex justify-center mb-4">
                      <span className="text-6xl">🚀</span>
                    </div>
                    <p className="text-white font-semibold text-xl text-center leading-relaxed">
                      "{section.quote}"
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default LegalPage;
