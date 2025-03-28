def recommend_resources(weak_topics):
    resources = {
        'Sets': ['Video on Set Theory Basics', 'Practice Problems on Subsets'],
        'Relations': ['Interactive Simulation on Relations', 'Concept Notes on Power Sets']
    }
    return [resources[topic] for topic in weak_topics if topic in resources]

    weak_topics=["Sets"]
    print(recommend_resources(weak_topics))
    
    
