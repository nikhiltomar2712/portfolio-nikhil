require "json"
require "fileutils"

root = File.expand_path("..", __dir__)
target = File.join(root, "public", "data", "ruby-profile.json")

profile = {
  generated_by: "Ruby",
  name: "Nikhil Tomar",
  github: "https://github.com/nikhiltomar2712",
  identity: [
    "New Delhi based builder",
    "Cybersecurity enthusiast",
    "Ethical hacking and threat hunting learner",
    "Japanese N3 track"
  ],
  japan_goal: {
    target_country: "Japan",
    target_role: "Cyber Security Engineer",
    specialization: "Red Team"
  },
  intro: "Nikhil is building toward a red team cyber security career in Japan by combining programming, security labs, GitHub projects, and Japanese study."
}

FileUtils.mkdir_p(File.dirname(target))
File.write(target, JSON.pretty_generate(profile))
puts "Generated #{target}"
